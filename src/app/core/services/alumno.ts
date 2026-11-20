import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from './mock-api';

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private http = inject(HttpClient);
  private apiUrl = 'api/alumnos'; // Sin la barra inicial

  getAlumnos(): Observable<Alumno[]> { 
    return this.http.get<Alumno[]>(this.apiUrl); 
  }
  
  createAlumno(alumno: Alumno): Observable<Alumno> { 
    return this.http.post<Alumno>(this.apiUrl, alumno); 
  }
  
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> { 
    return this.http.put<Alumno>(`${this.apiUrl}/${id}`, alumno); 
  }
  
  deleteAlumno(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}