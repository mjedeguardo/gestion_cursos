import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowed = route.data['roles'] as number[];

  if (allowed && allowed.includes(auth.getRol())) return true;

  alert('Acceso denegado: no tienes permiso para esta sección.');
  return router.createUrlTree(['/dashboard/cursos']);
};