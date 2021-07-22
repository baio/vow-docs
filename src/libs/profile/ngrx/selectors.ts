import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from '../models';

export const selectUserAuthState =
  createFeatureSelector<ProfileState>('profile');

export const selectSocialAuthState = createSelector(
  selectUserAuthState,
  (state) => state.socialAuthState
);
