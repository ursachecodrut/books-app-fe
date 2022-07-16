import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Token } from './models/token.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl: string = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.authUrl}/register`, user);
  }

  login(user: User): Observable<Token> {
    return this.http.post(`${this.authUrl}/login`, user).pipe(
      map((token) => {
        return this.saveToken(token as Token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  private saveToken(token: Token): Token {
    localStorage.setItem('access_token', token.access_token);
    return token;
  }
}
