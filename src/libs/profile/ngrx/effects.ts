/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { SecureStorageService } from '@app/secure-storage';
import { appStarted } from '@app/shared';
import { YaAuthService } from '@app/social-auth';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, NEVER } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { SocialAuthProvider } from '../models';
import {
  profileRehydrate,
  profileRehydrateSuccess,
  profileSocialLogin,
  profileSocialLoginError,
  profileSocialLoginSuccess,
  profileSocialLogout,
} from './actions';

const SOCIAL_AUTH_PROVIDER_KEY = 'social_auth_provider';
const SOCIAL_AUTH_TOKEN_KEY = 'social_auth_token';

@Injectable()
export class ProfileEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly yaAuthService: YaAuthService,
    private readonly secureStorageService: SecureStorageService
  ) {}

  appStarted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appStarted),
      map(() => profileRehydrate())
    )
  );

  profileSocialLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileSocialLogin),
      switchMap(async ({ provider, continuation }) => {
        switch (provider) {
          case 'yandex':
            try {
              const token = await this.yaAuthService.login();
              return profileSocialLoginSuccess({
                socialAuthState: { token, provider },
                continuation,
              });
            } catch {
              return null;
            }
          default:
            return null;
        }
      }),
      filter((f) => !!f)
    )
  );

  profileSocialLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileSocialLoginSuccess),
      switchMap(async ({ socialAuthState, continuation }) => {
        await this.secureStorageService.setValue(
          SOCIAL_AUTH_PROVIDER_KEY,
          socialAuthState.provider
        );
        await this.secureStorageService.setValue(
          SOCIAL_AUTH_TOKEN_KEY,
          socialAuthState.token
        );
        if (continuation) {
          return continuation;
        } else {
          return null;
        }
      }),
      filter((f) => !!f)
    )
  );

  profileSocialLoginRehydrate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileRehydrate),
      switchMap(async () => {
        const provider = await this.secureStorageService.getValue(
          SOCIAL_AUTH_PROVIDER_KEY
        );
        const token = await this.secureStorageService.getValue(
          SOCIAL_AUTH_TOKEN_KEY
        );
        const socialAuthState =
          provider && token
            ? { provider: provider as SocialAuthProvider, token }
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
          await this.secureStorageService.removeValue(SOCIAL_AUTH_PROVIDER_KEY);
          await this.secureStorageService.removeValue(SOCIAL_AUTH_TOKEN_KEY);
        })
      ),
    {
      dispatch: false,
    }
  );
}
