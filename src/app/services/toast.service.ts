import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';


@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // ToastController is injected to show a toast when the button is clicked
  private readonly _toastController: ToastController = inject(ToastController);
async showToast(message: string, isError: boolean = false): Promise<void> {
    const toast = await this._toastController.create({
      //icon: isError ? 'close-circle' : 'checkmark-circle',
      message: message,
      color: isError ? 'danger' : 'success',
      duration: 5000,
      mode: 'ios',
      position: 'top',
      swipeGesture: 'vertical',
    });
    await toast.present();
  }
  
}
