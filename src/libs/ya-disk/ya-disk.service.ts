import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { base64Str2Blob } from '../docs/utils';

import { Http } from '@capacitor-community/http';

export const VOW_DOCS_FOLDER_NAME = 'VOW-DOCS';

@Injectable({ providedIn: 'root' })
export class YaDiskService {
  constructor(private readonly http: HttpClient) {}

  getUrl(path: string) {
    return `https://cloud-api.yandex.net/v1/disk/${path}`;
  }

  getHeaders(token: string) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `OAuth ${token}`,
    };
  }

  private createAppFolder(token: string) {
    const url = this.getUrl(`resources?path=${VOW_DOCS_FOLDER_NAME}`);
    const headers = this.getHeaders(token);
    return this.http.put(url, null, { headers });
  }

  uploadImage(token: string, imageBase64: string, fileName: string) {
    const blob = base64Str2Blob(imageBase64);
    const url = this.getUrl(
      `resources/upload?path=${VOW_DOCS_FOLDER_NAME}/${fileName}`
    );
    const headers = this.getHeaders(token);
    return this.http.get(url, { headers }).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 409) {
          // folder not exists
          return this.createAppFolder(token).pipe(
            // try to upload again
            switchMap(() => this.http.get(url, { headers }))
          );
        } else {
          return throwError(err);
        }
      }),
      switchMap((res: any) => {
        const uploadUrl = res.href;
        return this.http.put(uploadUrl, blob);
      })
    );
  }
}
