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
      switchMap(({ doc, socialAuthState }) =>
        this.yaDisk
          .uploadImage(socialAuthState.token, doc.imgBase64, `${doc.id}.jpeg`)
          .pipe(
            map((url) => uploadCloudDocSuccess({ doc, url })),
            catchError((error) => of(uploadCloudDocError({ error, doc })))
          )
      )
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
      switchMap(({ id, socialAuthState }) =>
        this.yaDisk.removeImage(socialAuthState.token, `${id}.jpeg`).pipe(
          map((url) => removeCloudDocSuccess({ id })),
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
