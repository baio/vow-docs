import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { AuthProvider } from '../models';

@Component({
  selector: 'app-profile-social-providers',
  templateUrl: 'profile-social-providers.component.html',
  styleUrls: ['profile-social-providers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppProfileSocialProvidersComponent {
  @Output() login = new EventEmitter<AuthProvider>();

  constructor() {}
}
