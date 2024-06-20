import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { login } from '../../../core/signals/auth.signal';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: User = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      response => {
        login(response.token);
        this.toastr.success('Login successful')
        //this.router.navigate(['/books']);
      },
      error => {
        this.toastr.error(error.error)
      }
    );
  }
}

