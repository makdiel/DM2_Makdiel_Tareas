import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ToastService } from '../toast.service';
import { AlertService } from '../shared/alert.service';
import { UserDto } from 'src/app/dtos/user/user.dto';
import { environment } from 'src/environments/environment.prod';
import { EmailDto } from 'src/app/dtos/user/email.dto';
import { Router } from '@angular/router';

const API_URL = `${environment.API_URL}emailverifications`;
const API_URL_TOKEN = `${environment.API_URL}verify`;
const API_URL_ACCOUNT = `${environment.API_URL}accounts`;

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _ToastService: ToastService = inject(ToastService);
  private readonly _AlertService: AlertService = inject(AlertService);
   private readonly _router: Router = inject(Router);
  email: WritableSignal<EmailDto | null> = signal(null);

   //metodo para post como debe ser
    verificarEmail(email:EmailDto): void {
      this._httpClient.post<EmailDto>(API_URL,email).subscribe ({
        next: async (response: EmailDto) => {
          await this._ToastService.showToast('Email Verificado');
          console.log(`Email Verificado: ${response}`);
         // this.email.set([...this.email(), response]);
          this._router.navigate(['/tabs/home']);
        },
        error: async () => {
          await this._ToastService.showToast('Error al Verificar email', true);
        },
      });
    }

      verificarToken(email:EmailDto): void {
      this._httpClient.post<EmailDto>(API_URL_TOKEN,email).subscribe ({
        next: async (response: EmailDto) => {
          await this._ToastService.showToast('Token Verificado');
          console.log(`Token Verificado: ${response}`);
         // this.email.set([...this.email(), response]);
          this._router.navigate(['/tabs/home']);
        },
        error: async () => {
          await this._ToastService.showToast('Error al Verificar Token', true);
        },
      });
    }

      CrearCuenta(email:EmailDto): void {
      this._httpClient.post<EmailDto>(API_URL_ACCOUNT,email).subscribe ({
        next: async (response: EmailDto) => {
          await this._ToastService.showToast('Cuenta Creada');
          console.log(`Cuenta creada: ${response}`);
         // this.email.set([...this.email(), response]);
          this._router.navigate(['/tabs/home']);
        },
        error: async () => {
          await this._ToastService.showToast('Error al Crear Cuenta', true);
        },
      });
    }
}
