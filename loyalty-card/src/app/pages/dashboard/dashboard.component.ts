import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type Reward = {
  title: string;
  description: string;
  cost: number; // points
  tag?: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // --- Existing API ping state -
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

  // --- Dashboard content (mock data za UI) ---
  customerName = 'Marina';
  memberId = 'BL-2026-0198';

  points = 1280;
  tier = 'Gold';
  nextTier = 'Platinum';
  pointsToNextTier = 720;

  rewards: Reward[] = [
    { title: 'Free Shipping', description: 'On orders over €25', cost: 300, tag: 'Popular' },
    { title: '10% Off', description: 'Any skincare item', cost: 500 },
    { title: 'Free Mini', description: 'Travel-size product', cost: 800, tag: 'New' },
    { title: '15% Off', description: 'Makeup products', cost: 900 },
  ];

  redeem(reward: Reward): void {
    alert(`Redeem: ${reward.title} (${reward.cost} points)`);
  }

  canRedeem(reward: Reward): boolean {
    return this.points >= reward.cost;
  }
}
