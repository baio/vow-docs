import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocialAuthProvider } from '../models';
import { profileSocialLogin, profileSocialLogout } from '../ngrx/actions';
import { selectSocialAuthState } from '../ngrx/selectors';
import { SocialAuthProviderWithOffline } from '../profile-social-providers/profile-social-providers.component';

export interface ProfileWorkspaceView {
  socialAuthProvider: SocialAuthProviderWithOffline;
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
    this.view$ = store.select(selectSocialAuthState).pipe(
      map((socialAuthState) => ({
        socialAuthProvider: socialAuthState
          ? socialAuthState.provider
          : 'offline',
      }))
    );
  }

  onSelectedProviderChange(value: SocialAuthProviderWithOffline) {
    if (value === 'offline') {
      this.store.dispatch(profileSocialLogout());
    } else {
      this.store.dispatch(profileSocialLogin({ provider: value }));
    }
  }
}
