import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  isAuthed = false;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.isAuthed = this.auth.isLoggedIn();
    this.applyScrollRule(this.router.url);

    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.isAuthed = this.auth.isLoggedIn();
        this.applyScrollRule(url);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.body.classList.remove('no-scroll');
  }

  logout(): void {
    this.auth.logout();         
    this.isAuthed = false;
    this.router.navigate(['/login']);
  }

  private applyScrollRule(url: string): void {
    const isAuthPage = url.startsWith('/login') || url.startsWith('/register');
    document.body.classList.toggle('no-scroll', isAuthPage);
  }
}
