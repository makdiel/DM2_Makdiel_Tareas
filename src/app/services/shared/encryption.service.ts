import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
   decrypt(data: string): string {
    return window.atob(data);
  }

  encrypt(data: string): string {
    return window.btoa(data);
  }
  
}
