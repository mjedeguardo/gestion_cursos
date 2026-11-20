import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core'; // <-- Agregamos ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../core/services/usuario';
import { Usuario } from '../../core/services/mock-api';
import { EstadoPipe } from '../../shared/pipes/estado-pipe';
import { ResaltarDirective } from '../../shared/directives/resaltar';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoPipe, ResaltarDirective],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private cdr = inject(ChangeDetectorRef); // <-- Lo inyectamos

  usuarios: Usuario[] = [];
  mostrarModal = false;
  editando = false;
  usuarioActual: Usuario = { id_usuario: 0, dni: '', nombre: '', apellido: '', email: '', estado: 1, id_rol: 1 };

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        console.log('Datos que llegan al componente:', data);
        this.usuarios = [...data]; 
        
        // ¡EL TRUCO MÁGICO!
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  resetFormulario(): Usuario {
    return { id_usuario: 0, dni: '', nombre: '', apellido: '', email: '', estado: 1, id_rol: 1 };
  }

  abrirModalCrear() {
    this.editando = false;
    this.usuarioActual = this.resetFormulario();
    this.mostrarModal = true;
  }

  abrirModalEditar(user: Usuario) {
    this.editando = true;
    this.usuarioActual = { ...user };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardar() {
    if (this.editando) {
      this.usuarioService.updateUsuario(this.usuarioActual.id_usuario, this.usuarioActual).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    } else {
      this.usuarioService.createUsuario(this.usuarioActual).subscribe(() => {
        this.cargarUsuarios();
        this.cerrarModal();
      });
    }
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }
}