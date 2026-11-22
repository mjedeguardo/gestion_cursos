import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { loginGuard } from './core/guards/login-guard';

export const routes: Routes = [
  // Ruta pública
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./features/login/login').then(m => m.LoginComponent)
  },
  // Ruta protegida (Dashboard principal)
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent),
    children: [
      {
        path: 'usuarios',
        canActivate: [roleGuard],
        data: { roles: [1] },
        loadComponent: () => import('./features/usuarios/usuarios').then(m => m.UsuariosComponent)
      },
      {
        path: 'alumnos',
        canActivate: [roleGuard],
        data: { roles: [1, 2] },
        loadComponent: () => import('./features/alumnos/alumnos').then(m => m.AlumnosComponent)
      },
      {
        path: 'cursos',
        canActivate: [roleGuard],
        data: { roles: [1, 2, 3] },
        loadComponent: () => import('./features/cursos/cursos').then(m => m.CursosComponent)
      },
      {
        path: 'notas',
        canActivate: [roleGuard],
        data: { roles: [1, 2, 3] },
        loadComponent: () => import('./features/notas/notas').then(m => m.NotasComponent)
      },
      { path: '', redirectTo: 'cursos', pathMatch: 'full' }
    ]
  },
  // Redirecciones
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFoundComponent)
  }
];