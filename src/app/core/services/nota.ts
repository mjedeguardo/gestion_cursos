import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaCurso } from './mock-api';

@Injectable({ providedIn: 'root' })
export class NotaService {
  private http = inject(HttpClient);
  private apiUrl = 'api/notas'; // Sin la barra inicial

  getNotas(): Observable<NotaCurso[]> { 
    return this.http.get<NotaCurso[]>(this.apiUrl); 
  }
  
  createNota(nota: NotaCurso): Observable<NotaCurso> { 
    return this.http.post<NotaCurso>(this.apiUrl, nota); 
  }
  
  updateNota(id: number, nota: NotaCurso): Observable<NotaCurso> { 
    return this.http.put<NotaCurso>(`${this.apiUrl}/${id}`, nota); 
  }
  
  deleteNota(id: number): Observable<any> { 
    return this.http.delete(`${this.apiUrl}/${id}`); 
  }
}