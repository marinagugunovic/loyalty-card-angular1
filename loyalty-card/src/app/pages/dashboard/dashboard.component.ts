import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  lastResponse: any = null;

  constructor(private http: HttpClient) {}

  // klik na "Ping API"
  ping(): void {
    // ako nemaš backend, koristi jednostavan public endpoint da testiramo
    this.http.get('https://httpbin.org/get').subscribe({
      next: (res) => (this.lastResponse = res),
      error: (err) => (this.lastResponse = err),
    });
  }

  stringify(data: any): string {
    return JSON.stringify(data, null, 2);
  }
}
