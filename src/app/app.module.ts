import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SqLiteService } from '@app/db';
import { YaAuthService, YA_AUTH_CONFIG } from '@app/social-auth';
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { SecureStorageService } from 'src/libs/secure-storage/secure-storage.service';
import { v4 } from 'uuid';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { storeLogger } from 'ngrx-store-logger';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const DEVICE_ID_STORAGE_KEY = 'DEVICE_ID';

let APP_DEVICE_ID: string;

export const getDeviceId = async (secureStorage: SecureStorageService) => {
  let deviceId = await secureStorage.getValue(DEVICE_ID_STORAGE_KEY);
  if (!deviceId) {
    deviceId = v4();
  }
  await secureStorage.setValue(DEVICE_ID_STORAGE_KEY, deviceId);
  return deviceId;
};

export const appInitializerFactory =
  (platform: Platform, secureStorage: SecureStorageService) => async () => {
    await platform.ready();
    APP_DEVICE_ID = await getDeviceId(secureStorage);
  };

export const yaAuthConfigFactory = () => ({
  ...environment.social.yandex,
  deviceId: APP_DEVICE_ID,
});

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function logger(reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    IonicModule.forRoot(),
    EffectsModule.forRoot(),
  ],
  providers: [
    SecureStorageService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Platform, SecureStorageService],
      multi: true,
    },
    // { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: YA_AUTH_CONFIG,
      useFactory: yaAuthConfigFactory,
    },
    SqLiteService,
    YaAuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
