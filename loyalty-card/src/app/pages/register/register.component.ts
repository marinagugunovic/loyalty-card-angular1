import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}

  register(): void {
    // kasnije će ovde ići pravi register
    this.auth.setToken('fake-jwt-token');
    this.router.navigate(['/dashboard']);
  }
}
