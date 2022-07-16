import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Token } from './models/token.model';
import { Auth } from './models/auth.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(user: Auth): Observable<Token> {
    return this.http.post<Token>(`${this.authUrl}/register`, user);
  }

  login(user: Auth): Observable<Token> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      map((token) => {
        return this.saveToken(token as Token);
      })
    );
  }

  getId() {
    return this.http.get(`${this.authUrl}/me`).pipe(
      map((data) => {
        localStorage.setItem('userId', (data as User).id);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  private saveToken(token: Token): Token {
    localStorage.setItem('access_token', token.access_token);
    return token;
  }
}
