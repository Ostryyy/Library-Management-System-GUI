import { Component } from '@angular/core';
import { isLoggedIn, logout } from '../../signals/auth.signal';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isLoggedIn = isLoggedIn;

  constructor(private router: Router) {}

  logout(): void {
    logout();
    this.router.navigate(['/login']);
  }
}
