import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface LoginResponse {
  usernames: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: LoginResponse | null = null;

  constructor(private http: HttpClient) {}

  login(usernames: string, passwords: string): Observable<boolean> {
    return this.http.post<LoginResponse>('http://localhost:3000/api/login', { usernames, passwords })
      .pipe(
        map((response: LoginResponse) => {
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
    return !!this.loggedInUser;
  }

  getLoggedInUser(): LoginResponse | null {
    return this.loggedInUser;
  }

  isAdmin(): boolean {
    return this.loggedInUser?.role === 'admin';
  }

  isResponsable(): boolean {
    return this.loggedInUser?.role === 'responsable';
  }

  isMemberEquipe(): boolean {
    return this.loggedInUser?.role === 'membre_equipe';
  }

  isSchool(): boolean {
    return this.loggedInUser?.role === 'school';
  }
}
