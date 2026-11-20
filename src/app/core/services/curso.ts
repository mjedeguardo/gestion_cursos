import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './mock-api';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private http = inject(HttpClient);
  private apiUrl = 'api/cursos'; // Sin la barra inicial

  getCursos(): Observable<Curso[]> { 
    return this.http.get<Curso[]>(this.apiUrl); 
  }
  
  createCurso(curso: Curso): Observable<Curso> { 
    return this.http.post<Curso>(this.apiUrl, curso); 
  }
  
  updateCurso(id: number, curso: Curso): Observable<Curso> { 
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso); 
  }
  
  deleteCurso(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}