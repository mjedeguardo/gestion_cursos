import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align:center; margin-top:80px; font-family:Arial, sans-serif;">
      <h1 style="font-size:72px; margin:0;">404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <a routerLink="/dashboard">Volver al panel</a>
    </div>
  `
})
export class NotFoundComponent {}