import { createReducer, on } from '@ngrx/store';
import { assoc } from 'lodash/fp';
import { UserAuthState } from '../models';
import {
  profileRehydrateSuccess,
  profileSocialLoginSuccess,
  profileSocialLogout,
} from './actions';

export const initialState: UserAuthState = {
  socialAuthState: null,
};

export const profileReducer = createReducer(
  initialState,
  on(profileSocialLoginSuccess, (state, { socialAuthState }) =>
    assoc('socialAuthState', socialAuthState, state)
  ),
  on(profileRehydrateSuccess, (state, { socialAuthState }) =>
    assoc('socialAuthState', socialAuthState, state)
  ),
  on(profileSocialLogout, (state) =>
    assoc('socialAuthState', null as any, state)
  )
);
