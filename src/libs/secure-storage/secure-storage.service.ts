import { Injectable } from '@angular/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({ providedIn: 'root' })
export class SecureStorageService {
  setValue(key: string, value: string) {
    return SecureStoragePlugin.set({
      key,
      value,
    });
  }

  async getValue(key: string) {
    try {
      const result = await SecureStoragePlugin.get({ key });
      return result.value;
    } catch {
      return null;
    }
  }

  async removeValue(key: string) {
    try {
      const result = await SecureStoragePlugin.remove({ key });
      return result.value;
    } catch {
      return null;
    }
  }
}
