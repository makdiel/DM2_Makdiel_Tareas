import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { PreferenceService } from 'src/app/services/shared/preference.service';
import { environment } from 'src/environments/environment.prod';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const preferencesService: PreferenceService = inject(PreferenceService);
  const router: Router = inject(Router);

  return from(preferencesService.get<string>('accessToken')).pipe(
    switchMap((authToken) => {
      const isApiUrl: boolean = request.url.startsWith(environment.API_URL);
      if (authToken && isApiUrl)
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });

      return next(request).pipe(
        catchError((error) => {
          const CODES_STATUS: number[] = [401, 403]; // 401: Unauthorized, 403: Forbidden
          if (CODES_STATUS.includes(error.status)) {
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    })
  );
};
