import { Component } from '@angular/core';
import { AuthService } from '@app/auth';
import { DbService, SqLiteService } from '@app/db';
import { appStarted } from '@app/shared';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

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
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly db: DbService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    const ret = await this.sqLiteService.initializePlugin();
    console.log('$$$ in App  this.initPlugin ', ret);

    const res = await this.sqLiteService.echo('Hello World');
    console.log('$$$ from Echo ' + res.value);

    await this.authService.isAuthenticated$
      .pipe(
        filter((f) => !!f),
        take(1)
      )
      .toPromise();

    const securityKey = await this.authService.getSecurityKey();

    await this.db.init(securityKey);

    this.store.dispatch(appStarted());
  }
}
