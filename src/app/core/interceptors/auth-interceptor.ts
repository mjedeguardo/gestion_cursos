import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Agregamos el token a cada petición
  let authReq = req;
  if (token) {
    authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // SI HAY UN ERROR GLOBAL (Token expirado, no autorizado)
      if (error.status === 401 || error.status === 403) {
        alert('Tu sesión ha expirado o no tienes permisos. Vuelve a iniciar sesión.');
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};