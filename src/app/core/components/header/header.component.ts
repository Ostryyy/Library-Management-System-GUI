import { Component } from '@angular/core';
import { isLoggedIn, logout } from '../../signals/auth.signal';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatButtonModule, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem, MatMenu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn = isLoggedIn;

  isAdmin(): boolean {
    const role = this.authService.getUserRole();
    return role === 'admin';
  }
  
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToReservations(): void {
    this.router.navigate(['/reservations']);
  }

  navigateToAdmin(): void {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    logout();
    this.router.navigate(['/login']);
  }
}
