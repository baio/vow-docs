import { Injectable } from '@angular/core';
import { selectSocialAuthState } from '@app/profile';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { YaDiskService } from 'src/libs/ya-disk';
import { DocsRepositoryService } from '../repository/docs.repository';
import {
  removeCloudDoc,
  removeCloudDocError,
  removeCloudDocSuccess,
  uploadCloudDoc,
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
    private readonly docsRepository: DocsRepositoryService
  ) {}

  uploadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadCloudDoc),
      withLatestFrom(this.token$),
      filter(([_, token]) => !!token),
      switchMap(([{ doc }, token]) => {
        const cloudText = formatCloudText(doc);
        return this.yaDisk
          .uploadDocument({
            token,
            imageBase64: doc.imgBase64,
            imgFileName: `${doc.id}.jpeg`,
            text: cloudText,
            textFileName: `${doc.id}.txt`,
          })
          .pipe(
            map(({ imageFileUrl }) =>
              uploadCloudDocSuccess({ doc, url: imageFileUrl })
            ),
            catchError((error) => of(uploadCloudDocError({ error, doc })))
          );
      })
    )
  );

  uploadDocumentUpdateRepository$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadCloudDoc, uploadCloudDocSuccess, uploadCloudDocError),
        switchMap(({ doc }) =>
          this.store.select(selectDoc(doc.id)).pipe(take(1))
        ),
        switchMap((doc) =>
          this.docsRepository.updateDocStored(doc.id, doc.stored)
        )
      ),
    { dispatch: false }
  );

  removeDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCloudDoc),
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
        ofType(removeCloudDoc),
        switchMap((doc) => this.docsRepository.updateDocStored(doc.id, null))
      ),
    { dispatch: false }
  );
}
