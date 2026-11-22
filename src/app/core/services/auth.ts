import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Usuarios simulados: 1 = Admin, 2 = Profesor, 3 = Estudiante
  private usuarios = [
    { email: 'admin@test.com', password: '123456', rol: 1 },
    { email: 'profesor@test.com', password: '123456', rol: 2 },
    { email: 'alumno@test.com', password: '123456', rol: 3 }
  ];

  login(credentials: any): Observable<any> {
    const u = this.usuarios.find(
      x => x.email === credentials.email && x.password === credentials.password
    );
    if (!u) return of({ error: 'Credenciales inválidas' });

    const token = this.crearToken(u.email, u.rol);
    localStorage.setItem('token', token);
    return of({ token }).pipe(delay(300));
  }

  // Arma un JWT simulado: header.payload.firma (vence en 1 hora)
  private crearToken(email: string, rol: number): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: email,
      rol,
      exp: Math.floor(Date.now() / 1000) + 3600
    }));
    return `${header}.${payload}.firma-simulada`;
  }

  private getPayload(): any {
    const t = localStorage.getItem('token');
    if (!t) return null;
    try { return JSON.parse(atob(t.split('.')[1])); } catch { return null; }
  }

  isLoggedIn(): boolean {
    const p = this.getPayload();
    return !!p && p.exp * 1000 > Date.now(); // token existe y no venció
  }

  getRol(): number { return this.getPayload()?.rol ?? 0; }

  logout() { localStorage.removeItem('token'); }
}