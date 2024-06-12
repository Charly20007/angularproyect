import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode, ExtendedJwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://inclubtest.com:2053/api/token';
  private isAuthenticated = false;
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.loginUrl, body, { headers }).pipe(
      map(response => {
        if (response && response.access_Token) {
          const decodedToken: ExtendedJwtPayload = jwtDecode(response.access_Token);
          console.log('Decoded Token:', decodedToken);

          localStorage.setItem('authToken', response.access_Token);
          this.userId = decodedToken.primarysid ?? null;
          this.isAuthenticated = true;
          return true;
        } else {
          this.isAuthenticated = false;
          return false;
        }
      }),
      catchError(error => {
        console.error('Error en la solicitud de inicio de sesión:', error);
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
    this.userId = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getDecodedToken(): ExtendedJwtPayload | null {
    const token = this.getAuthToken();
    return token ? jwtDecode<ExtendedJwtPayload>(token) : null;
  }
}
