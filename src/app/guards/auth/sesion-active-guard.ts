import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PreferenceService } from 'src/app/services/shared/preference.service';

export const sesionActiveGuard: CanActivateFn = async () => {
  const _preferenceService = inject(PreferenceService);
  const _router = inject(Router);
  const accessToken = await _preferenceService.get('accessToken');
  if (accessToken) {
    _router.navigate(['/tabs/home']);
  }
  return !accessToken;
};
