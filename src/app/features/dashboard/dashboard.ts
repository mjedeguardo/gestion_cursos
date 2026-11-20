import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  rol = this.authService.getRol(); // Obtenemos el rol para mostrarlo

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}