import { createAction, props } from '@ngrx/store';
import { AuthProvider, SocialAuthState } from '../models';

export const profileRehydrate = createAction('[Profile] Rehydrate');

export const profileRehydrateSuccess = createAction(
  '[Profile] Rehydrate Success',
  props<{ socialAuthState: SocialAuthState | null }>()
);

export const profileSocialLogin = createAction(
  '[Profile] Social Login',
  props<{ provider: AuthProvider }>()
);

export const profileSocialLoginSuccess = createAction(
  '[Profile] Social Login Success',
  props<{ socialAuthState: SocialAuthState }>()
);

export const profileSocialLogout = createAction('[Profile] Social Logout');
