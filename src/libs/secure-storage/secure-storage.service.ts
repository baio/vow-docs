import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecureStorage {
  setValue(key: string, value: string) {
    return Promise.resolve(null);
  }

  getValue(key: string) {
    return Promise.resolve(key);
  }

  removeValue(key: string) {
    return Promise.resolve(null);
  }

}
