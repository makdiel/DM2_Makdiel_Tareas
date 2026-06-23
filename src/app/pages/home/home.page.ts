import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonActionSheet,
  IonToast,
  IonFabButton,
  ToastController,
  IonAlert,
  AlertController,
  IonItem,
  IonIcon,
  IonAvatar,
  ActionSheetController,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  text,
  logoBitcoin,
  checkmarkCircle,
  closeCircle,
  pencilOutline,
  addCircleOutline,
  trashOutline,
  openOutline,
  logOutOutline,
  arrowUpOutline,
  arrowDownOutline,
  swapHorizontalOutline,
} from 'ionicons/icons';
import { UserDto } from 'src/app/dtos/user/user.dto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/shared/alert.service';
import { PreferenceService } from 'src/app/services/shared/preference.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoginDto } from 'src/app/dtos/auth/login.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonAvatar,
    IonIcon,
    IonItem,
    IonToast,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonAlert,
  ],
})
export class HomePage {
  //injecto la dependencia de toas controller para mostrar los toast desde el ts
  private readonly _toastController: ToastController = inject(ToastController);
  //injecto la dependencia AlertController para mostrar las alertas 3era forma de mostrar alertas
  private readonly _alertController: AlertController = inject(AlertController);
  //injecto el servicio para mostrar los toast
  private readonly _toastService: ToastService = inject(ToastService);
  //injecto el servicio para las alertas
  private readonly _alertService: AlertService = inject(AlertService);
  private readonly _userService: UserService = inject(UserService);
  private readonly _preferenceService: PreferenceService =
    inject(PreferenceService);
  private readonly _authService: AuthService = inject(AuthService);
  users = this._userService.users;
  login = this._authService.login;



/*
  getUser(id: number): void {
    this._userService.getUser(id);
  }

*/
  getUser(): void {
    this._userService.getUser();
  }

  deleteUser(id: number): void {
    this._userService.confirmDeleteUser(id);
  }

  createUser(): void {
    const newUser: UserDto = {
      id: 0,
      names: 'John duton',
      surnames: 'johndut',
      email: 'johnd@example.com',
      address: 'direccion',
      phoneNumber: '551-454-54',
      imageProfile: 'site,com',
      fcmToken: '',
    };
    this._userService.createUser(newUser);
  }

  updateUser(user: UserDto): void {
    this._userService.updateUser({
      ...user,
      names: 'Makdiel Tabora',
    });
  }

  constructor(private actionSheetCtrl: ActionSheetController) {
    this._userService.getUser(),
      addIcons({
        'chekmark-circle': checkmarkCircle,
        'close-circle': closeCircle,
        'pencil-outline': pencilOutline,
        'add-circle-outline': addCircleOutline,
        'trash-outline': trashOutline,
        'open-outline': openOutline,
        'log-out': logOutOutline,
        arrowUpOutline,
        arrowDownOutline,
        swapHorizontalOutline,
      });
  }


  //creo la señal seteada en falso
  openToast = signal(false);

  //creo el evento click para setear la señan en true
  openOrCloseToast(): void {
    this.openToast.set(!this.openToast());
  }

  //mostrando los toast desde aqui usando el controlador
  async openToastController(): Promise<void> {
    const toast = this._toastController.create({
      message: 'Mostrando toast desde TS',
      color: 'success',
      duration: 3000,
      mode: 'ios',
      position: 'top', //top - bottom -Smiddle
    });
    (await toast).present();
  }
  //mosntrando el toast desde el servicio.ts
  async showToast(): Promise<void> {
    await this._toastService.showToast('Mostranto el Toast Service');
  }

 

  //mosntrando el toast desde el servicio.ts
  async showAlertService(): Promise<void> {
    await this._alertService.showAlert(
      'Mostranto el Toast Service',
      'Alerta-Confirmation',
      'Confirmacion Service si o no?'
    );
  }

  //cerrar sesion
  async closeSesion(): Promise<void> {
    await this._authService.logout();
  }


}
