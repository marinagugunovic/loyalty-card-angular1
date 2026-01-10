import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  token: string | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.token = this.auth.getToken();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

