/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

const jsonToQueryString = (json) =>
  '?' +
  Object.keys(json)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&');

const YA_VOW_DOCS_AUTH_STATE = 'ya';

@Injectable()
export class YaAuthService {
  constructor() {}

  async login() {
    const deviceId = '123456789';
    console.log('???!!!', deviceId);

    const config = {
      clientId: '7489e5aae33b4568bf21cb434060df4d',
      redirectUrl: 'io.ionic.starter://login',
      scope:
        'cloud_api:disk.app_folder cloud_api:disk.read cloud_api:disk.write cloud_api:disk.info',
    };

    const qs = {
      response_type: 'token',
      client_id: config.clientId,
      device_id: deviceId,
      device_name: deviceId,
      redirect_uri: config.redirectUrl,
      scope: config.scope,
      force_confirm: 'yes',
      display: 'popup',
      state: YA_VOW_DOCS_AUTH_STATE,
    };
    const url = `https://oauth.yandex.com/authorize${jsonToQueryString(qs)}`;

    const x = await Browser.open({ url });

    const listenerHandler1 = await Browser.addListener(
      'browserPageLoaded',
      // eslint-disable-next-line space-before-function-paren
      () => {
        console.log('1111', this, Browser, window.location);
      }
    );

    const listenerHandler2 = await Browser.addListener(
      'browserFinished',
      () => {
        console.log('2222');
      }
    );
  }
}
