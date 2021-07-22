import { Component } from '@angular/core';
import { SqLiteService } from '@app/db';
import { appStarted } from '@app/shared';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';

//import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly sqLiteService: SqLiteService,
    private readonly platform: Platform,
    private readonly store: Store
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      const ret = await this.sqLiteService.initializePlugin();
      console.log('$$$ in App  this.initPlugin ', ret);

      const res = await this.sqLiteService.echo('Hello World');
      console.log('$$$ from Echo ' + res.value);

      this.store.dispatch(appStarted());
    });
  }
}
