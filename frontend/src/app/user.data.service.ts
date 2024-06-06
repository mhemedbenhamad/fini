import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private baseUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/data`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  addUser(username: string, password: string, role: string, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('image', imageFile, imageFile.name);

    return this.http.post(`${this.baseUrl}/user/add`, formData);
  }

  updateUser(id: number, username: string, password: string, role: string, imageFile: File | null): Observable<any> {
    const body: { username: string; password: string; role: string; image?: FormData } = {
      username: username,
      password: password,
      role: role
    };
  
    if (imageFile) {
      // Ajouter imageFile au FormData si nécessaire
      const formData: FormData = new FormData();
      formData.append('image', imageFile, imageFile.name);
      body.image = formData;
    }
  
    return this.http.put(`${this.baseUrl}/user_modifiee/${id}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  
  

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/delete/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUserImage(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/image/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  countUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/count`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/profile`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(oldPassword: string, newPassword: string): Observable<any> {
    const body = { oldPassword, newPassword };

    return this.http.put<any>(`${this.baseUrl}/api/user/password`, body, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
  updateUserRole(id: number, role: string): Observable<any> {
    const body = { role };
    return this.http.put(`${this.baseUrl}/user/update-role/${id}`, body, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error.message || 'Server error');
  }
}
