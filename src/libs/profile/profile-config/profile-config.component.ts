import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ProfileConfig, SocialAuthProvider } from '../models';

export type SocialAuthProviderWithOffline = SocialAuthProvider | 'offline';

@Component({
  selector: 'app-profile-config',
  templateUrl: 'profile-config.component.html',
  styleUrls: ['profile-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfileConfigComponent {
  @Input() config: ProfileConfig;

  @Output() configChange = new EventEmitter<ProfileConfig>();

  constructor() {}

  onSelect($event: MouseEvent, value: SocialAuthProviderWithOffline) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onChange($event: any) {
    const checked = $event.detail.checked;
    this.configChange.emit({
      ...this.config,
      uploadToCloudAutomatically: checked,
    });
  }
}
