import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqLiteService } from '@app/db';

import { App } from '@capacitor/app';

const checkAppLaunchUrl = async () => {
  const { url } = await App.getLaunchUrl();

  alert('App opened with URL: ' + url);
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly sqLiteService: SqLiteService,
    private readonly platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      const ret = await this.sqLiteService.initializePlugin();
      console.log('$$$ in App  this.initPlugin ', ret);

      const res = await this.sqLiteService.echo('Hello World');
      console.log('$$$ from Echo ' + res.value);

      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });

      App.addListener('appUrlOpen', (data) => {
        console.log('App opened with URL:', data);
      });

      App.addListener('appRestoredResult', (data) => {
        console.log('Restored state:', data);
      });
    });
  }
}
