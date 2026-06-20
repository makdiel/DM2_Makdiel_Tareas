import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from '../toast.service';
import { UserDto } from 'src/app/dtos/user/user.dto';
import { AlertService } from '../shared/alert.service';
import { CameraService } from '../shared/camera.service';

const API_URL: string = `${environment.API_URL}user`;

@Injectable({
  providedIn: 'root',
})
export class UserCameraService {
   private readonly _alertService: AlertService = inject(AlertService);
  private readonly _cameraService: CameraService = inject(CameraService);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _toastService: ToastService = inject(ToastService);
  user: WritableSignal<UserDto | null> = signal(null);

  getUser(): void {
    this._httpClient.get<UserDto>(API_URL).subscribe({
      next: (response: UserDto) => {
        this.user.set(response);
      },
      error: async () => {
        await this._toastService.showToast('Error al obtener el usuario', true);
      },
    });
  }
}
