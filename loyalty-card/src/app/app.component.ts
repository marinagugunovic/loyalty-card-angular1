import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // set odmah na startu
    this.applyScrollRule(this.router.url);

    // i na svaku promenu rute
    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        this.applyScrollRule(url);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    document.body.classList.remove('no-scroll');
  }

  private applyScrollRule(url: string): void {
    const isAuthPage = url.startsWith('/login') || url.startsWith('/register');
    document.body.classList.toggle('no-scroll', isAuthPage);
  }
}
