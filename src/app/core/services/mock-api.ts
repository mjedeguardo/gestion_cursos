import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

// --- INTERFACES (Basadas en tu diagrama de Base de Datos) ---
export interface Usuario { id_usuario: number; dni: string; nombre: string; apellido: string; email: string; estado: number; id_rol: number; }
export interface Alumno { id_alumno: number; id_usuario: number; dni_apoderado: string; telefono: string; fecha_nacimiento: string; }
export interface Curso { id_curso: number; id_seccion: number; nombre: string; descripcion: string; estado: number; }
export interface NotaCurso { id_nota: number; id_curso: number; id_alumno: number; nombre_evaluacion: string; calificacion: number; ponderacion: number; }

@Injectable({ providedIn: 'root' })
export class MockApiService {
  // --- BASE DE DATOS SIMULADA ---
  private usuarios: Usuario[] = [
    { id_usuario: 1, dni: '12345678', nombre: 'Juan', apellido: 'Perez', email: 'juan@test.com', estado: 1, id_rol: 1 },
    { id_usuario: 2, dni: '87654321', nombre: 'Maria', apellido: 'Gomez', email: 'maria@test.com', estado: 1, id_rol: 2 }
  ];
  private alumnos: Alumno[] = [
    { id_alumno: 1, id_usuario: 1, dni_apoderado: '11111111', telefono: '999888777', fecha_nacimiento: '2000-01-01' }
  ];
  private cursos: Curso[] = [
    { id_curso: 1, id_seccion: 1, nombre: 'Angular Básico', descripcion: 'Intro', estado: 1 }
  ];
  private notas: NotaCurso[] = [
    { id_nota: 1, id_curso: 1, id_alumno: 1, nombre_evaluacion: 'Examen 1', calificacion: 18, ponderacion: 0.3 }
  ];

  // ==================== USUARIOS ====================
  getUsuarios(): Observable<Usuario[]> { return of(this.usuarios).pipe(delay(300)); }
  addUsuario(user: Usuario): Observable<Usuario> {
    const nuevo = { ...user, id_usuario: this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id_usuario)) + 1 : 1 };
    this.usuarios.push(nuevo);
    return of(nuevo).pipe(delay(300));
  }
  updateUsuario(id: number, user: Usuario): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id_usuario === id);
    if (index !== -1) {
      this.usuarios[index] = { ...user, id_usuario: id };
      return of(this.usuarios[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Usuario no encontrado'));
  }
  deleteUsuario(id: number): Observable<boolean> {
    this.usuarios = this.usuarios.filter(u => u.id_usuario !== id);
    return of(true).pipe(delay(300));
  }

  // ==================== ALUMNOS ====================
  getAlumnos(): Observable<Alumno[]> { return of(this.alumnos).pipe(delay(300)); }
  addAlumno(alumno: Alumno): Observable<Alumno> {
    const nuevo = { ...alumno, id_alumno: this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id_alumno)) + 1 : 1 };
    this.alumnos.push(nuevo);
    return of(nuevo).pipe(delay(300));
  }
  updateAlumno(id: number, alumno: Alumno): Observable<Alumno> {
    const index = this.alumnos.findIndex(a => a.id_alumno === id);
    if (index !== -1) {
      this.alumnos[index] = { ...alumno, id_alumno: id };
      return of(this.alumnos[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Alumno no encontrado'));
  }
  deleteAlumno(id: number): Observable<boolean> {
    this.alumnos = this.alumnos.filter(a => a.id_alumno !== id);
    return of(true).pipe(delay(300));
  }

  // ==================== CURSOS ====================
  getCursos(): Observable<Curso[]> { return of(this.cursos).pipe(delay(300)); }
  addCurso(curso: Curso): Observable<Curso> {
    const nuevo = { ...curso, id_curso: this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id_curso)) + 1 : 1 };
    this.cursos.push(nuevo);
    return of(nuevo).pipe(delay(300));
  }
  updateCurso(id: number, curso: Curso): Observable<Curso> {
    const index = this.cursos.findIndex(c => c.id_curso === id);
    if (index !== -1) {
      this.cursos[index] = { ...curso, id_curso: id };
      return of(this.cursos[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Curso no encontrado'));
  }
  deleteCurso(id: number): Observable<boolean> {
    this.cursos = this.cursos.filter(c => c.id_curso !== id);
    return of(true).pipe(delay(300));
  }

  // ==================== NOTAS ====================
  getNotas(): Observable<NotaCurso[]> { return of(this.notas).pipe(delay(300)); }
  addNota(nota: NotaCurso): Observable<NotaCurso> {
    const nueva = { ...nota, id_nota: this.notas.length > 0 ? Math.max(...this.notas.map(n => n.id_nota)) + 1 : 1 };
    this.notas.push(nueva);
    return of(nueva).pipe(delay(300));
  }
  updateNota(id: number, nota: NotaCurso): Observable<NotaCurso> {
    const index = this.notas.findIndex(n => n.id_nota === id);
    if (index !== -1) {
      this.notas[index] = { ...nota, id_nota: id };
      return of(this.notas[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Nota no encontrada'));
  }
  deleteNota(id: number): Observable<boolean> {
    this.notas = this.notas.filter(n => n.id_nota !== id);
    return of(true).pipe(delay(300));
  }
}