import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { TestApiService } from '../../core/api/test-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  token: string | null = null;
  lastResponse: any = null;

  constructor(
    private auth: AuthService,
    private api: TestApiService,
    private router: Router
  ) {}
  stringify(value: any): string {
  return value ? JSON.stringify(value, null, 2) : '';
}


  ngOnInit(): void {
    this.token = this.auth.getToken();
  }

  ping(): void {
    this.api.ping().subscribe({
      next: (res) => (this.lastResponse = res),
      error: (err) => (this.lastResponse = err),
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
