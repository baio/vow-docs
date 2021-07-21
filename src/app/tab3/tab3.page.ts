import { Component } from '@angular/core';
import { YaAuthService } from 'src/libs/social-auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private readonly yaAuthService: YaAuthService) {}

  onLogin(provider: 'yandex') {
    this.yaAuthService.login();
  }
}
