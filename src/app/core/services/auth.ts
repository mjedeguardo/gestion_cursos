import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: any): Observable<any> {
    // Simulamos la validación de un JWT real
    if (credentials.email === 'admin@test.com' && credentials.password === '123456') {
      const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('rol', '1'); // 1 = Admin
      return of({ token: fakeToken, rol: 1 }).pipe(tap(() => console.log('Login exitoso')));
    }
    return of({ error: 'Credenciales inválidas' });
  }

  logout() { localStorage.clear(); }
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  getRol(): number { return Number(localStorage.getItem('rol')); }
}