/* eslint-disable @typescript-eslint/naming-convention */
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { PluginListenerHandle } from '@capacitor/core';

const jsonToQueryString = (json) =>
  '?' +
  Object.keys(json)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&');

const YA_VOW_DOCS_AUTH_STATE = 'ya';

export interface YaAuthConfig {
  deviceId: string;
  clientId: string;
  redirectUrl: string;
  scope: string;
}

export const YA_AUTH_CONFIG = new InjectionToken<YaAuthConfig>(
  'YA_AUTH_CONFIG'
);

@Injectable({ providedIn: 'root' })
export class YaAuthService {
  constructor(@Inject(YA_AUTH_CONFIG) private readonly config: YaAuthConfig) {}

  async login(): Promise<string> {
    //const deviceId = '123456789';

    /*
    const config = {
      clientId: '7489e5aae33b4568bf21cb434060df4d',
      redirectUrl: 'io.ionic.starter://login',
      scope:
        'cloud_api:disk.app_folder cloud_api:disk.read cloud_api:disk.write cloud_api:disk.info',
    };
    */

    const qs = {
      response_type: 'token',
      client_id: this.config.clientId,
      device_id: this.config.deviceId,
      device_name: this.config.deviceId,
      redirect_uri: this.config.redirectUrl,
      scope: this.config.scope,
      force_confirm: 'yes',
      display: 'popup',
      state: YA_VOW_DOCS_AUTH_STATE,
    };
    const url = `https://oauth.yandex.com/authorize${jsonToQueryString(qs)}`;

    await Browser.open({ url });

    return new Promise(async (resolve, reject) => {
      const handlers: PluginListenerHandle[] = [];

      const removeHandlers = () => handlers.forEach((h) => h.remove());

      const handler1 = await Browser.addListener('browserFinished', () => {
        console.warn('Browser.addListener(browserFinished)');
        removeHandlers();
        reject('Browser closed');
      });

      handlers.push(handler1);

      const handler2 = App.addListener('appUrlOpen', (data) => {
        removeHandlers();
        console.log('App opened with URL:', data);
        //data.url;

        const regex = `${this.config.redirectUrl.replace(
          /\//g,
          '\\/'
        )}#state=${YA_VOW_DOCS_AUTH_STATE}&access_token=(\\w+)`;
        const dataUrl = data.url;
        const match = dataUrl.match(regex);
        if (match.length === 2) {
          resolve(match[1]);
        } else {
          reject('OAuth unknown result pattern');
        }
      });

      handlers.push(handler2);
    });
  }
}
