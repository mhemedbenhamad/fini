import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: LoginResponse | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:3000/login/api/login', { username, password })
      .pipe(
        map((response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          this.loggedInUser = response;
          return true;
        }),
        catchError((error) => {
          console.error('Erreur de connexion:', error);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getLoggedInUser(): LoginResponse | null {
    return this.loggedInUser;
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getProfile(): Observable<LoginResponse | null> {
    return this.http.get<LoginResponse>('http://localhost:3000/login/api/profile', { headers: this.getHeaders() })
      .pipe(
        map((response: LoginResponse) => {
          if (!response) {
            console.error('Profil utilisateur non trouvé');
            return null;
          }
          return response;
        }),
        catchError((error) => {
          console.error('Erreur lors de la récupération du profil de l\'utilisateur:', error);
          return of(null);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInUser = null;
  }

  isAdmin(): boolean {
    return this.loggedInUser?.role === 'admin';
  }

  isResponsable(): boolean {
    return this.loggedInUser?.role === 'responsable';
  }

  isMemberEquipe(): boolean {
    return this.loggedInUser?.role === 'member_equipe';
  }

  isSchool(): boolean {
    return this.loggedInUser?.role === 'school';
  }

  isGestionnaireProjet(): boolean {
    return this.loggedInUser?.role === 'gestionnaire-projet';
  }
}
