import { createReducer, on } from '@ngrx/store';
import { assoc, assocPath } from 'lodash/fp';
import { ProfileState } from '../models';
import {
  profileRehydrateSuccess,
  profileSocialLoginSuccess,
  profileSocialLogout,
  setUploadToCloudAutomatically,
} from './actions';

export const initialState: ProfileState = {
  socialAuthState: null,
  config: {
    uploadToCloudAutomatically: false,
    extractImageDataAutomatically: false,
  },
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
  ),
  on(setUploadToCloudAutomatically, (state, { uploadToCloudAutomatically }) =>
    assocPath(
      ['config', 'uploadToCloudAutomatically'],
      uploadToCloudAutomatically,
      state
    )
  )
);
