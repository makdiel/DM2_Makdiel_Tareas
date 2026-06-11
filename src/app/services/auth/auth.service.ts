import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/dtos/auth/login.dto';
import { TokenResponseDto } from 'src/app/dtos/auth/token-response.dto';
import { environment } from 'src/environments/environment.prod';
import { PreferenceService } from '../shared/preference.service';
import { ToastService } from '../toast.service';

const API_URL: string = `${environment.API_URL}auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _preferenceService: PreferenceService =
    inject(PreferenceService);
  private readonly _router: Router = inject(Router);
  private readonly _toastService: ToastService = inject(ToastService);

  login(input: LoginDto): void {
    this._httpClient
      .post<TokenResponseDto>(`${API_URL}/login`, input)
      .subscribe({
        next: async (response: TokenResponseDto) => {
          await this._preferenceService.set(
            'accessToken',
            response.accessToken
          );
          await this._preferenceService.set(
            'refreshToken',
            response.refreshToken
          );
          await this._preferenceService.set('email', response.email);
          await this._preferenceService.set('userId', response.userId);
          await this._toastService.showToast(
            `Haz iniciado sesión como ${response.email}`
          );
          this._router.navigate(['/tabs/home']);
        },
        error: async () => {
          this._toastService.showToast('Error al iniciar sesión', true);
        },
      });
  }

  async logout(): Promise<void> {
    await this._preferenceService.clear();
    await this._toastService.showToast('Has cerrado sesión');
    this._router.navigate(['/login']);
  }
}

