import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileConfig, SocialAuthProvider } from '../models';
import {
  profileSocialLogin,
  profileSocialLogout,
  setProfileConfig,
} from '../ngrx/actions';
import {
  selectProfileConfig,
  selectProfileState,
  selectSocialAuthState,
} from '../ngrx/selectors';
import { SocialAuthProviderWithOffline } from '../profile-social-providers/profile-social-providers.component';

export interface ProfileWorkspaceView {
  socialAuthProvider: SocialAuthProviderWithOffline;
  config: ProfileConfig;
}

@Component({
  selector: 'app-profile-workspace',
  templateUrl: 'profile-workspace.component.html',
  styleUrls: ['profile-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfileWorkspaceComponent {
  readonly view$: Observable<ProfileWorkspaceView>;

  constructor(private readonly store: Store) {
    this.view$ = store.select(selectProfileState).pipe(
      map(
        (profileState) =>
          ({
            config: profileState.config,
            socialAuthProvider: profileState.socialAuthState
              ? profileState.socialAuthState.provider
              : 'offline',
          } as ProfileWorkspaceView)
      )
    );
  }

  onSelectedProviderChange(value: SocialAuthProviderWithOffline) {
    if (value === 'offline') {
      this.store.dispatch(profileSocialLogout());
    } else {
      this.store.dispatch(profileSocialLogin({ provider: value }));
    }
  }

  onConfigChange(config: ProfileConfig) {
    this.store.dispatch(setProfileConfig({ config }));
  }
}
