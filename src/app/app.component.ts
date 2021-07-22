import { AfterViewInit, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqLiteService } from '@app/db';
import { Store } from '@ngrx/store';
import { appStarted } from '@app/shared';

//import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
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

  ngAfterViewInit() {
    console.log('222');
  }
}
