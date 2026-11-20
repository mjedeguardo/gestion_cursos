import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotaService } from '../../core/services/nota';
import { NotaCurso } from '../../core/services/mock-api';
import { ResaltarDirective } from '../../shared/directives/resaltar';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [CommonModule, FormsModule, ResaltarDirective],
  templateUrl: './notas.html',
  styleUrl: './notas.scss'
})
export class NotasComponent implements OnInit {
  private notaService = inject(NotaService);
  private cdr = inject(ChangeDetectorRef);

  notas: NotaCurso[] = [];
  mostrarModal = false;
  editando = false;
  notaActual: NotaCurso = { id_nota: 0, id_curso: 1, id_alumno: 1, nombre_evaluacion: '', calificacion: 0, ponderacion: 0 };

  ngOnInit(): void { this.cargarNotas(); }

  cargarNotas() {
    this.notaService.getNotas().subscribe(data => {
      this.notas = [...data];
      this.cdr.detectChanges();
    });
  }

  resetFormulario(): NotaCurso { return { id_nota: 0, id_curso: 1, id_alumno: 1, nombre_evaluacion: '', calificacion: 0, ponderacion: 0 }; }
  abrirModalCrear() { this.editando = false; this.notaActual = this.resetFormulario(); this.mostrarModal = true; }
  abrirModalEditar(nota: NotaCurso) { this.editando = true; this.notaActual = { ...nota }; this.mostrarModal = true; }
  cerrarModal() { this.mostrarModal = false; }

  guardar() {
    if (this.editando) {
      this.notaService.updateNota(this.notaActual.id_nota, this.notaActual).subscribe(() => { this.cargarNotas(); this.cerrarModal(); });
    } else {
      this.notaService.createNota(this.notaActual).subscribe(() => { this.cargarNotas(); this.cerrarModal(); });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar nota?')) this.notaService.deleteNota(id).subscribe(() => this.cargarNotas());
  }
}