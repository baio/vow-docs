/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';
import { PluginListenerHandle } from '@capacitor/core';

const jsonToQueryString = (json) =>
  '?' +
  Object.keys(json)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&');

const YA_VOW_DOCS_AUTH_STATE = 'ya';

@Injectable()
export class YaAuthService {
  constructor() {}

  async login(): Promise<string> {
    const deviceId = '123456789';

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

    await Browser.open({ url });

    return new Promise(async (resolve) => {
      const handlers: PluginListenerHandle[] = [];

      const removeHandlers = () => handlers.forEach((h) => h.remove());

      const handler1 = await Browser.addListener('browserFinished', () => {
        console.warn('Browser.addListener(browserFinished)');
        removeHandlers();
      });

      handlers.push(handler1);

      const handler2 = App.addListener('appUrlOpen', (data) => {
        console.log('App opened with URL:', data);
        removeHandlers();
        resolve('xxxx');
      });

      handlers.push(handler2);
    });
  }
}
