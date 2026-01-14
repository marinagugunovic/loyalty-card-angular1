import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const API = 'http://localhost:3000/api';

type AuthResponse = { token: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  // ✅ backend login
  login(email: string, pass: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API}/login`, { email, pass }).pipe(
      tap((res) => this.setToken(res.token))
    );
  }

  // ✅ backend signup
  signup(name: string, surname: string, email: string, pass: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API}/signup`, { name, surname, email, pass }).pipe(
      tap((res) => this.setToken(res.token))
    );
  }
}
