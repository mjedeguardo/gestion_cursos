import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  errorMensaje = '';

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(res => {
      if (res.token) {
        this.router.navigate(['/dashboard']); // Si hay token, entra
      } else {
        this.errorMensaje = 'Credenciales incorrectas'; // Si no, muestra error
      }
    });
  }
}