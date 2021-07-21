import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAuthState } from '../models';

export const selectUserAuthState =
  createFeatureSelector<UserAuthState>('profile');

export const selectSocialAuthState = createSelector(
  selectUserAuthState,
  (state) => state.socialAuthState
);
