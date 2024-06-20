import { Component, OnDestroy } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../core/services/auth.service';
import { login } from '../../../core/signals/auth.signal';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  subs$: Subscription = new Subscription();

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please fill out the form correctly.');
      return;
    }

    const user: User = {
      username: this.loginForm.get('username')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    this.subs$.add(
      this.authService.login(user).subscribe({
        next: (response) => {
          login(response.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
        complete: () => {
          this.toastr.success('Login successful');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
