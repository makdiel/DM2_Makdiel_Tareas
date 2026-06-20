import { inject, Injectable } from '@angular/core';
import {
  Camera,
  CameraDirection,
  GalleryPhotos,
  MediaResult,
} from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { camera, close, image } from 'ionicons/icons';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private readonly _actionSheetController: ActionSheetController = inject(
    ActionSheetController
  );

  constructor() {
    addIcons({ camera, close, image });
  }

  async onPickImage(): Promise<void> {
    const actionSheet = await this._actionSheetController.create({
      mode: 'ios',
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: async () => {
            await this.onTakePhoto();
          },
        },
        {
          text: 'Seleccionar de Galería',
          icon: 'image',
          handler: async () => {},
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  // Implementar lógica para tomar foto usando la cámara del dispositivo
  async onTakePhoto(
    cameraDirection: CameraDirection = CameraDirection.Rear
  ): Promise<string | null> {
    const image: MediaResult = await Camera.takePhoto({
      quality: 90,
      saveToGallery: true,
      editable: 'no',
      cameraDirection: cameraDirection,
    });
    return image.uri || null;
  }

  async onSelectFromGallery(): Promise<string | null> {
    const images: GalleryPhotos = await Camera.getLimitedLibraryPhotos();
    return images.photos.length > 0 ? images.photos[0].webPath || null : null;
  }
}
