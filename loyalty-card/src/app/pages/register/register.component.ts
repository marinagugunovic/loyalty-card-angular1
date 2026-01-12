import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isSubmitting = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      accept: [false, [Validators.requiredTrue]],
    });
  }

  get f() {
    return this.form.controls;
  }

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const password = this.form.value['password'];
    const confirmPassword = this.form.value['confirmPassword'];

    if (password !== confirmPassword) {
      this.form.controls['confirmPassword'].setErrors({ mismatch: true });
      return;
    }

    this.isSubmitting = true;

    // fake register -> login behaviour (kao login stranica)
    setTimeout(() => {
      this.auth.setToken('fake-jwt-token');
      this.router.navigate(['/dashboard']);
      this.isSubmitting = false;
    }, 350);
  }
}

