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
  withLatestFrom,
} from 'rxjs/operators';
import { YaDiskService } from 'src/libs/ya-disk';
import { uploadDoc, uploadDocError, uploadDocSuccess } from './actions';

@Injectable()
export class CloudEffects {
  private readonly token$ = this.store
    .select(selectSocialAuthState)
    .pipe(map((state) => state && state.token));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly yaDisk: YaDiskService
  ) {}

  uploadDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadDoc),
      withLatestFrom(this.token$),
      filter(([_, token]) => !!token),
      switchMap(([{ doc }, token]) =>
        this.yaDisk.uploadImage(token, doc.imgBase64, `${doc.id}.jpeg`).pipe(
          map(() => uploadDocSuccess({ doc })),
          catchError((error) => of(uploadDocError({ error, doc })))
        )
      )
    )
  );
}
