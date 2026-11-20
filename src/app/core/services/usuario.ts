import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './mock-api'; // Asegúrate de que esta ruta sea correcta

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  // IMPORTANTE: La barra al inicio (/) es necesaria para que el interceptor la atrape
  private apiUrl = '/api/usuarios'; 

  getUsuarios(): Observable<Usuario[]> { 
    return this.http.get<Usuario[]>(this.apiUrl); 
  }
  
  createUsuario(user: Usuario): Observable<Usuario> { 
    return this.http.post<Usuario>(this.apiUrl, user); 
  }
  
  updateUsuario(id: number, user: Usuario): Observable<Usuario> { 
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, user); 
  }
  
  deleteUsuario(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}