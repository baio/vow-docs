/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { YaAuthService } from '@app/social-auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SecureStorage } from 'src/libs/secure-storage/secure-storage.service';
import { AuthProvider } from '../models';
import {
  profileRehydrate,
  profileRehydrateSuccess,
  profileSocialLogin,
  profileSocialLoginSuccess,
  profileSocialLogout,
} from './actions';

const SOCIAL_AUTH_PROVIDER_KEY = 'social_auth_provider';
const SOCIAL_AUTH_TOKEN_KEY = 'social_auth_token';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly yaAuthService: YaAuthService,
    private readonly secureStorage: SecureStorage
  ) {}

  profileSocialLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileSocialLogin),
      switchMap(({ provider }) => {
        switch (provider) {
          case 'yandex':
            return this.yaAuthService
              .login()
              .then((token) => ({ token, provider }));
          default:
            throw new Error(`provider is not found, ${provider}`);
        }
      }),
      map((socialAuthState) => profileSocialLoginSuccess({ socialAuthState })),
      catchError(() => EMPTY)
    )
  );

  profileSocialLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileSocialLoginSuccess),
        tap(async ({ socialAuthState }) => {
          await this.secureStorage.setValue(
            SOCIAL_AUTH_PROVIDER_KEY,
            socialAuthState.provider
          );
          await this.secureStorage.setValue(
            SOCIAL_AUTH_TOKEN_KEY,
            socialAuthState.token
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  profileSocialLoginRehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileRehydrate),
      switchMap(async () => {
        const provider = await this.secureStorage.getValue(
          SOCIAL_AUTH_PROVIDER_KEY
        );
        const token = await this.secureStorage.getValue(SOCIAL_AUTH_TOKEN_KEY);
        const socialAuthState =
          provider && token
            ? { provider: provider as AuthProvider, token }
            : null;
        return profileRehydrateSuccess({ socialAuthState });
      })
    )
  );

  profileSocialLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(profileSocialLogout),
        tap(async () => {
          await this.secureStorage.removeValue(SOCIAL_AUTH_PROVIDER_KEY);
          await this.secureStorage.removeValue(SOCIAL_AUTH_TOKEN_KEY);
        })
      ),
    {
      dispatch: false,
    }
  );
}
