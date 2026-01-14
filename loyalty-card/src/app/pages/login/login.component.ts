import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isSubmitting = false;
  serverError = '';
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  login(): void {
    this.serverError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const email = String(this.form.value.email).trim();
    const pass = String(this.form.value.pass);

    this.auth.login(email, pass).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.isSubmitting = false;
      },
      error: (err: any) => {
        this.serverError = err?.error?.error || 'Login failed';
        this.isSubmitting = false;
      },
    });
  }
}
