import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../core/services/alumno';
import { Alumno } from '../../core/services/mock-api';
import { ResaltarDirective } from '../../shared/directives/resaltar';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, ResaltarDirective],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class AlumnosComponent implements OnInit {
  private alumnoService = inject(AlumnoService);
  private cdr = inject(ChangeDetectorRef);

  alumnos: Alumno[] = [];
  mostrarModal = false;
  editando = false;
  alumnoActual: Alumno = { id_alumno: 0, id_usuario: 1, dni_apoderado: '', telefono: '', fecha_nacimiento: '' };

  ngOnInit(): void { this.cargarAlumnos(); }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(data => {
      this.alumnos = [...data];
      this.cdr.detectChanges();
    });
  }

  resetFormulario(): Alumno { return { id_alumno: 0, id_usuario: 1, dni_apoderado: '', telefono: '', fecha_nacimiento: '' }; }
  abrirModalCrear() { this.editando = false; this.alumnoActual = this.resetFormulario(); this.mostrarModal = true; }
  abrirModalEditar(alumno: Alumno) { this.editando = true; this.alumnoActual = { ...alumno }; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  guardar() {
    if (this.editando) {
      this.alumnoService.updateAlumno(this.alumnoActual.id_alumno, this.alumnoActual).subscribe(() => { this.cargarAlumnos(); this.cerrarModal(); });
    } else {
      this.alumnoService.createAlumno(this.alumnoActual).subscribe(() => { this.cargarAlumnos(); this.cerrarModal(); });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar alumno?')) this.alumnoService.deleteAlumno(id).subscribe(() => this.cargarAlumnos());
  }
}