import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
    private readonly _encryptService: EncryptionService =
    inject(EncryptionService);

  async clear(): Promise<void> {
    await Preferences.clear();
  }

  async get<T>(key: string): Promise<T | null> {
    const encryptedKey: string = this._encryptService.encrypt(key);
    const { value } = await Preferences.get({ key: encryptedKey });
    const decryptedValue: string = this._encryptService.decrypt(value ?? '');
    return decryptedValue ? (JSON.parse(decryptedValue) as T) : null;
  }

  async remove(key: string): Promise<void> {
    const encryptedKey: string = this._encryptService.encrypt(key);
    await Preferences.remove({ key: encryptedKey });
  }

  async set<T>(key: string, value: T): Promise<void> {
    const encryptedKey: string = this._encryptService.encrypt(key);
    const stringValue: string = JSON.stringify(value);
    const encryptedValue: string = this._encryptService.encrypt(stringValue);
    await Preferences.set({ key: encryptedKey, value: encryptedValue });
  }
  
}
