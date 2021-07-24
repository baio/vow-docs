import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { selectSocialAuthState } from '@app/profile';
import { appStarted } from '@app/shared';
import { Clipboard } from '@capacitor/clipboard';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import {
  ActionSheetController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppDocEditWorkspaceComponent } from '../components/doc-edit-workspace/doc-edit-workspace.component';
import { AppDocWorkspaceComponent } from '../components/doc-workspace/doc-workspace.component';
import { AppFullScreenImageComponent } from '../components/full-screen-image/full-screen-image.component';
import { DocsRepositoryService } from '../repository/docs.repository';
import { docToText } from '../utils';
import {
  addDocTag,
  copyClipboard,
  deleteDoc,
  deleteDocConfirmed,
  displayDoc,
  editDoc,
  rehydrateDocs,
  rehydrateDocsSuccess,
  removeDocTag,
  setDocComment,
  shareDoc,
  showFullScreenImage,
  updateDocFormatted,
  updateDocState,
  addDocument,
  addDocError,
  addDocSuccess,
} from './actions';
import { selectDoc } from './selectors';

@Injectable()
export class DocsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly modalController: ModalController,
    private readonly docRepository: DocsRepositoryService,
    private readonly toastController: ToastController,
    private readonly store: Store,
    private readonly actionSheetController: ActionSheetController
  ) {}

  appStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appStarted),
      map(() => rehydrateDocs())
    )
  );

  rehydrateDocs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rehydrateDocs),
      switchMap(() => this.docRepository.getDocs()),
      map((docs) => rehydrateDocsSuccess({ docs }))
    )
  );

  /*
  addDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDocument),
      switchMap(({ id, base64 }) =>
        this.docsDataAccess.uploadImage(id, base64).pipe(mapTo(id))
      ),
      map((id) => addDocSuccess({ id })),
      catchError((_) => of(addDocError()))
    )
  );
  */
  addDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDocument),
      map((doc) => addDocSuccess({ id: doc.id }))
    )
  );

  storeToDb$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addDocument),
        switchMap(({ id, base64 }) => this.docRepository.addDoc(id, base64))
      ),
    { dispatch: false }
  );

  /*
    pollDocState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(uploadImageSuccess),
            switchMap(({ id }) => {
                // poll every 3 seconds 5 times or till state completed
                const stop$ = new Subject();
                return timer(100, 100).pipe(
                    takeUntil(stop$),
                    take(5),
                    switchMap(() => this.docsDataAccess.getDocumentState(id)),
                    switchMap((result) => {
                        if (
                            result.formatted &&
                            result.labeled &&
                            result.parsed &&
                            result.stored
                        ) {
                            stop$.next();
                        }
                        return of({ id, docState: result });
                    })
                );
            }),
            map((payload) => updateDocState(payload))
        )
    );
    */

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDocument),
      switchMap(async ({ id }) => {
        const modal = await this.modalController.create({
          component: AppDocEditWorkspaceComponent,
          componentProps: {
            documentId: id,
            title: 'Новый документ',
          },
        });
        await modal.present();
        await modal.onWillDismiss();
        return displayDoc({ id });
      })
    )
  );

  displayDocShowModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(displayDoc),
        tap(async ({ id }) => {
          const modal = await this.modalController.create({
            component: AppDocWorkspaceComponent,
            componentProps: {
              documentId: id,
            },
          });
          await modal.present();
          const { data } = await modal.onWillDismiss();
        })
      ),
    { dispatch: false }
  );

  editDocShowModal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editDoc),
        tap(async ({ id }) => {
          const modal = await this.modalController.create({
            component: AppDocEditWorkspaceComponent,
            componentProps: {
              documentId: id,
              title: 'Данные документа',
            },
          });
          await modal.present();
          const { data } = await modal.onWillDismiss();
        })
      ),
    { dispatch: false }
  );

  updateDocState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDocState),
        tap(({ id, docState }) =>
          this.docRepository.updateDocState(id, docState)
        )
      ),
    { dispatch: false }
  );

  setDocComment$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setDocComment),
        tap(({ id, comment }) => this.docRepository.setDocComment(id, comment))
      ),
    { dispatch: false }
  );

  deleteDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDoc),
      withLatestFrom(this.store.select(selectSocialAuthState)),
      switchMap(async ([{ doc }, socialAuthState]) => {
        const buttons = [
          {
            text: 'Удалить с телефона',
            icon: 'alert-outline',
            role: 'remove-device',
          },
          {
            text: 'Отмена',
            icon: 'close-outline',
            role: 'cancel',
          },
        ];
        if (socialAuthState && doc.stored) {
          buttons.splice(1, 0, {
            text: 'Удалить везде',
            icon: 'cloud-offline-outline',
            role: 'remove-everywhere',
          });
        }
        const actionSheet = await this.actionSheetController.create({
          header: 'Удалить документ',
          buttons,
        });

        await actionSheet.present();

        const { role } = await actionSheet.onWillDismiss();

        if (role === 'remove-device' || role === 'remove-everywhere') {
          return deleteDocConfirmed({
            id: doc.id,
            deleteFromCloud: role === 'remove-everywhere',
          });
        } else {
          return null;
        }
      }),
      filter((f) => !!f)
    )
  );

  deleteDocConfirmed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteDocConfirmed),
        tap(async ({ id }) => {
          await this.modalController.dismiss();
          // this.router.navigate(['/tabs', 'docs']);
          await this.docRepository.deleteDoc(id);
        })
      ),
    { dispatch: false }
  );

  updateDocFormatted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateDocFormatted),
        tap(({ id, docFormatted }) =>
          this.docRepository.updateDocFormatted(id, docFormatted)
        )
      ),
    { dispatch: false }
  );

  shareDoc$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(shareDoc),
        tap(async ({ doc, share }) => {
          const text = docToText(doc);
          const base64 = doc.imgBase64.split(',')[1];
          let filePath: string;
          let url: string;
          if (share !== 'doc-only') {
            filePath = `vow-doc-${new Date().getTime()}.jpg`;
            const res = await Filesystem.writeFile({
              path: filePath,
              data: base64,
              directory: Directory.Cache,
            });
            url = res.uri;
          }
          await Share.share({
            title: 'Документ',
            text: share !== 'image-only' ? text : null,
            url,
            dialogTitle: 'Отпраивть данные',
          });
          if (url) {
            await Filesystem.deleteFile({
              path: filePath,
              directory: Directory.Cache,
            });
          }
        })
      ),
    { dispatch: false }
  );

  copyClipboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(copyClipboard),
        tap(async ({ doc }) => {
          const text = docToText(doc);
          await Clipboard.write({
            // eslint-disable-next-line id-blacklist
            string: text,
            image: doc.imgBase64,
            label: 'Документ',
          });
          const toast = await this.toastController.create({
            header: 'Скопировано',
            position: 'top',
            duration: 1000,
          });
          await toast.present();
        })
      ),
    { dispatch: false }
  );

  fullScreenImage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showFullScreenImage),
        tap(async ({ doc }) => {
          const modal = await this.modalController.create({
            component: AppFullScreenImageComponent,
            componentProps: {
              imgBase64: doc.imgBase64,
            },
          });
          await modal.present();
          const { data } = await modal.onWillDismiss();
        })
      ),
    { dispatch: false }
  );

  setDocTags$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addDocTag, removeDocTag),
        switchMap(({ id }) => this.store.select(selectDoc(id))),
        tap((doc) => {
          this.docRepository.setDocTags(doc.id, doc.tags);
        })
      ),
    { dispatch: false }
  );
}
