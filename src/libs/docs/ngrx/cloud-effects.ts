import { Injectable } from '@angular/core';
import {
  profileSocialLogin,
  selectProfileState,
  selectSocialAuthState,
} from '@app/profile';
import { AlertController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { YaDiskService } from 'src/libs/ya-disk';
import { DocsRepositoryService } from '../repository/docs.repository';
import {
  deleteDocConfirmed,
  removeCloudDoc,
  removeCloudDocConfirmed,
  removeCloudDocError,
  removeCloudDocSuccess,
  uploadCloudDoc,
  uploadCloudDocConfirmed,
  uploadCloudDocError,
  uploadCloudDocSuccess,
} from './actions';
import { selectDoc } from './selectors';
import { formatCloudText } from './utils/cloud-text';

@Injectable()
export class CloudEffects {
  private readonly token$ = this.store
    .select(selectSocialAuthState)
    .pipe(map((state) => state && state.token));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly yaDisk: YaDiskService,
    private readonly docsRepository: DocsRepositoryService,
    private readonly alertController: AlertController
  ) {}

  uploadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadCloudDoc),
      withLatestFrom(this.store.select(selectProfileState)),
      switchMap(async ([{ doc, date }, profile]) => {
        if (profile.socialAuthState) {
          if (profile.config.uploadToCloudAutomatically) {
            // provider connected and we can upload doc automatically
            return uploadCloudDocConfirmed({ doc, date });
          } else {
            // asking permission to upload doc
            const alert = await this.alertController.create({
              header: 'Загрузить документ в облако?',
              message: `Ваш документ будет загружен на ваш ${profile.socialAuthState.provider} диск`,
              buttons: [
                { text: 'Отмена', role: 'cancel' },
                { text: 'Загрузить', role: 'ok' },
              ],
            });

            await alert.present();

            const { role } = await alert.onDidDismiss();

            return role === 'ok'
              ? uploadCloudDocConfirmed({ doc, date })
              : null;
          }
        } else {
          // ask connect provider first !
          const alert = await this.alertController.create({
            header: 'Войти в облако',
            message: `Для сохрвнения вашего документа в облаке необходим вход на ваш облачный диск`,
            inputs: [
              {
                name: 'yandex',
                type: 'radio',
                label: 'Yandex',
                value: 'yandex',
                checked: true,
              },
            ],
            buttons: [
              { text: 'Отмена', role: 'cancel' },
              { text: 'Войти', role: 'ok' },
            ],
          });
          await alert.present();

          const { role } = await alert.onDidDismiss();

          if (role === 'ok') {
            return profileSocialLogin({
              provider: 'yandex',
              continuation: uploadCloudDocConfirmed({ doc, date }),
            });
          }
        }
      }),
      filter((f) => !!f)
    )
  );

  uploadDocumentConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadCloudDocConfirmed),
      withLatestFrom(this.store.select(selectSocialAuthState)),
      filter(([_, socialAuthState]) => !!socialAuthState),
      switchMap(([{ doc }, socialAuthState]) => {
        const cloudText = formatCloudText(doc);
        return this.yaDisk
          .uploadDocument({
            token: socialAuthState.token,
            imageBase64: doc.imgBase64,
            imgFileName: `${doc.id}.jpeg`,
            text: cloudText,
            textFileName: `${doc.id}.txt`,
          })
          .pipe(
            map(({ imageFileUrl }) =>
              uploadCloudDocSuccess({
                doc,
                url: imageFileUrl,
                provider: socialAuthState.provider,
              })
            ),
            catchError((error) => of(uploadCloudDocError({ error, doc })))
          );
      })
    )
  );

  uploadDocumentUpdateRepository$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          uploadCloudDocConfirmed,
          uploadCloudDocSuccess,
          uploadCloudDocError
        ),
        switchMap(({ doc }) => {
          console.log('222', doc);
          return this.store.select(selectDoc(doc.id)).pipe(take(1));
        }),
        switchMap((doc) => {
          console.log('333', doc);
          return this.docsRepository.updateDocStored(doc.id, doc.stored);
        })
      ),
    { dispatch: false }
  );

  removeDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDocConfirmed),
      filter((f) => f.deleteFromCloud),
      map(({ id }) => removeCloudDocConfirmed({ id }))
    )
  );

  removeCloudDoc$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCloudDoc),
      withLatestFrom(this.store.select(selectSocialAuthState)),
      filter(([_, socialAuthState]) => !!socialAuthState),
      switchMap(async ([{ id }, socialAuthState]) => {
        const alert = await this.alertController.create({
          header: 'Удалить документ из облака?',
          message: `Документ будет удален с вашего ${socialAuthState.provider} диска`,
          buttons: [
            { text: 'Отмена', role: 'cancel' },
            { text: 'Удалить', role: 'ok' },
          ],
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();

        return role === 'ok' ? removeCloudDocConfirmed({ id }) : null;
      }),
      filter((f) => !!f)
    )
  );

  removeCloudDocConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCloudDocConfirmed),
      withLatestFrom(this.token$),
      filter(([_, token]) => !!token),
      switchMap(([{ id }, token]) =>
        this.yaDisk
          .removeFiles({
            token,
            imgFileName: `${id}.jpeg`,
            textFileName: `${id}.txt`,
          })
          .pipe(
            map(() => removeCloudDocSuccess({ id })),
            catchError((error) => of(removeCloudDocError({ error, id })))
          )
      )
    )
  );

  removeDocumentUpdateRepository$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeCloudDocConfirmed),
        switchMap((doc) => this.docsRepository.updateDocStored(doc.id, null))
      ),
    { dispatch: false }
  );
}
