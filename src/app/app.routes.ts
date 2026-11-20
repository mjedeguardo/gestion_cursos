import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard'; 
import { roleGuard } from './core/guards/role-guard'; 

export const routes: Routes = [
  // Ruta pública
  { 
    path: 'login', 
    loadComponent: () => import('./features/login/login').then(m => m.LoginComponent) 
  },
  // Ruta protegida (Dashboard principal)
  {
    path: 'dashboard',
    canActivate: [authGuard], 
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent), 
    children: [
      // Rutas anidadas (Los 4 formularios)
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
        loadComponent: () => import('./features/alumnos/alumnos').then(m => m.AlumnosComponent) // Corregido
      },
      {
        path: 'cursos',
        canActivate: [roleGuard],
        data: { roles: [1, 2] }, 
        loadComponent: () => import('./features/cursos/cursos').then(m => m.CursosComponent) // Corregido
      },
      {
        path: 'notas',
        canActivate: [roleGuard],
        data: { roles: [1, 2] },
        loadComponent: () => import('./features/notas/notas').then(m => m.NotasComponent) 
      },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' } 
    ]
  },
  // Redirecciones
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 
];