import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { base64Str2Blob } from '../docs/utils';

export const VOW_DOCS_FOLDER_NAME = 'VOW-DOCS';

@Injectable({ providedIn: 'root' })
export class YaDiskService {
  constructor(private readonly http: HttpClient) {}

  getUrl(path: string) {
    return `https://cloud-api.yandex.net/v1/disk/{path}`;
  }

  getHeaders(token: string) {
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `OAuth ${token}`,
    };
  }

  private tryGetAppFolder(token: string) {
    const url = this.getUrl(`resources?path=${VOW_DOCS_FOLDER_NAME}`);
    const headers = this.getHeaders(token);
    return this.http.get(url, { headers });
  }

  private createAppFolder(token: string) {
    const url = this.getUrl(`resources?path=${VOW_DOCS_FOLDER_NAME}`);
    const headers = this.getHeaders(token);
    return this.http.put(url, { headers });
  }

  uploadImage(token: string, imageBase64: string, fileName: string) {
    const blob = base64Str2Blob(imageBase64);
    const url = this.getUrl(
      `resources/upload?path=${VOW_DOCS_FOLDER_NAME}/${fileName}`
    );
    const headers = this.getHeaders(token);
    return this.http.get(url, { headers }).pipe(
      switchMap((res: any) => {
        console.log('1111', res);
        const uploadUrl = res.href;
        return this.http.put(uploadUrl, { file: blob });
      }),
      catchError((err) => {
        console.error('error !!!', err);
        return throwError(err);
      })
    );
  }
}
