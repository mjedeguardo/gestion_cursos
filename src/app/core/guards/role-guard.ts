import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const userRol = authService.getRol();
  const allowedRoles = route.data['roles'] as number[];

  // Si el rol del usuario está dentro de los permitidos, pasa
  if (allowedRoles && allowedRoles.includes(userRol)) {
    return true;
  }
  
  // Si no tiene permiso, lo mandamos al dashboard
  router.navigate(['/dashboard']); 
  return false;
};