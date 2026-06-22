import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastService } from '../toast.service';
import { UserDto } from 'src/app/dtos/user/user.dto';
import { AlertService } from '../shared/alert.service';
import { CameraService } from '../shared/camera.service';

const API_URL = `${environment.API_URL}user`;
//const API_URL: string =`${environment.API_URL}users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _ToastService: ToastService = inject(ToastService);
  private readonly _AlertService: AlertService = inject(AlertService);
  private readonly _CameraService : CameraService = inject(CameraService);

  users: WritableSignal<UserDto[]> = signal([]);

  user: WritableSignal<UserDto | null> = signal(null);

  getUser(): void {
    this._httpClient.get<UserDto>(API_URL).subscribe({
      next: (response: UserDto) => {
        this.user.set(response);
        console.log(response);
      },
      error: async () => {
        await this._ToastService.showToast(
          'Error al obtener los usarios',
          true
        );
      },
    });
  }
/*
  getUser(id: number): void {
    this._httpClient.get<UserDto>(`${API_URL}/${id}`).subscribe({
      next: (response: UserDto) => {
        this.user.set(response);
        console.log(`Usuario Obtenido: ${response}`);
      },
      error: async () => {
        await this._ToastService.showToast('Error al obtener El usuario', true);
      },
    });
  }
*/
  confirmDeleteUser(id: number): void {
    this._AlertService.showAlertConfirmation(
      () => this.deleteUser(id),
      'Confirmacion',
      'Esta seguro de Eliminar este Usuario?',
      'El Usuario No se podra Recuperar'
    );
  }

  private deleteUser(id: number): void {
    this._httpClient.delete<UserDto>(`${API_URL}/${id}`).subscribe({
      next: async () => {
        await this._ToastService.showToast('El usuario fue eliminado');
        //puedo eliminar el usuario de los signal para no volver a hacer otro get del api
        this.users.set(this.users().filter((user: UserDto) => user.id !== id));
      },
      error: async () => {
        await this._ToastService.showToast('Error al obtener El usuario', true);
      },
    });
  }

  //metodo para post como debe ser
  createUser(user:UserDto): void {
    this._httpClient.post<UserDto>(API_URL,user).subscribe ({
      next: async (response: UserDto) => {
        await this._ToastService.showToast('Usuario Creado');
        console.log(`usuario creado: ${response}`);
        this.users.set([...this.users(), response]);
      },
      error: async () => {
        await this._ToastService.showToast('Error al crear usuairo', true);
      },
    });
  }
  
  updateUser(user: UserDto ): void{
    this._httpClient.put<UserDto>(`${API_URL}/${user.id}`, user).subscribe({
      next: async (response : UserDto) => {
        await this._ToastService.showToast('Usario actualizado');
        console.log(`Usuario Actualizado : ${response}`);
        //actualizo el signal, otra forma seria llamar el get general
        this.users.set(
          this.users().map((u: UserDto) => (u.id === user.id ? response : u)),
        );
      },
      error : async () => {
        await this._ToastService.showToast('Error al actualizar usuario', true);
      },
    })
  } 

}
