import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../../core/services/curso';
import { Curso } from '../../core/services/mock-api';
import { EstadoPipe } from '../../shared/pipes/estado-pipe';
import { ResaltarDirective } from '../../shared/directives/resaltar';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoPipe, ResaltarDirective],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss'
})
export class CursosComponent implements OnInit {
  private cursoService = inject(CursoService);
  private cdr = inject(ChangeDetectorRef);
  private auth = inject(AuthService);
  puedeEditar = this.auth.getRol() === 1 || this.auth.getRol() === 2;

  cursos: Curso[] = [];
  mostrarModal = false;
  editando = false;
  cursoActual: Curso = { id_curso: 0, id_seccion: 1, nombre: '', descripcion: '', estado: 1 };

  ngOnInit(): void { this.cargarCursos(); }

  cargarCursos() {
    this.cursoService.getCursos().subscribe(data => {
      this.cursos = [...data];
      this.cdr.detectChanges();
    });
  }

  resetFormulario(): Curso { return { id_curso: 0, id_seccion: 1, nombre: '', descripcion: '', estado: 1 }; }
  abrirModalCrear() { this.editando = false; this.cursoActual = this.resetFormulario(); this.mostrarModal = true; }
  abrirModalEditar(curso: Curso) { this.editando = true; this.cursoActual = { ...curso }; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  guardar() {
    if (this.editando) {
      this.cursoService.updateCurso(this.cursoActual.id_curso, this.cursoActual).subscribe(() => { this.cargarCursos(); this.cerrarModal(); });
    } else {
      this.cursoService.createCurso(this.cursoActual).subscribe(() => { this.cargarCursos(); this.cerrarModal(); });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar curso?')) this.cursoService.deleteCurso(id).subscribe(() => this.cargarCursos());
  }
}