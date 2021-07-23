import { Action, createAction, props } from '@ngrx/store';
import { SocialAuthProvider, SocialAuthState } from '../models';

export const profileRehydrate = createAction('[Profile] Rehydrate');

export const profileRehydrateSuccess = createAction(
  '[Profile] Rehydrate Success',
  props<{ socialAuthState: SocialAuthState | null }>()
);

export const profileSocialLogin = createAction(
  '[Profile] Social Login',
  props<{ provider: SocialAuthProvider; continuation?: Action }>()
);

export const profileSocialLoginSuccess = createAction(
  '[Profile] Social Login Success',
  props<{ socialAuthState: SocialAuthState; continuation?: Action }>()
);

export const profileSocialLoginError = createAction(
  '[Profile] Social Login Error'
);

export const profileSocialLogout = createAction('[Profile] Social Logout');

export const setUploadToCloudAutomatically = createAction(
  '[Profile] Set Upload To Cloud Automatically',
  props<{ uploadToCloudAutomatically: boolean }>()
);
