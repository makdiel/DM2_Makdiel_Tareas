import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ToastService } from '../toast.service';
import { AlertService } from '../shared/alert.service';
import { UserDto } from 'src/app/dtos/user/user.dto';
import { environment } from 'src/environments/environment.prod';
import { EmailDto } from 'src/app/dtos/user/email.dto';

const API_URL = `${environment.API_URL}users`;

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _ToastService: ToastService = inject(ToastService);
  private readonly _AlertService: AlertService = inject(AlertService);
  email: WritableSignal<EmailDto | null> = signal(null);

   //metodo para post como debe ser
    verificarEmail(email:EmailDto): void {
      this._httpClient.post<EmailDto>(API_URL,email).subscribe ({
        next: async (response: EmailDto) => {
          await this._ToastService.showToast('Email Verificado');
          console.log(`usuario creado: ${response}`);
         // this.email.set([...this.email(), response]);
        },
        error: async () => {
          await this._ToastService.showToast('Error al Verificar email', true);
        },
      });
    }
}
