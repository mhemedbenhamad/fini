import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  private baseUrl = 'http://localhost:3000/project';

  constructor(private http: HttpClient) { }

  getProjectDetailsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/${id}`)
      .pipe(
        catchError(this.handleError.bind(this)) // Bind the error handling function to the class scope
      );
  }

  getProjectDetailsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/nom/${name}`)
      .pipe(
        catchError(this.handleError.bind(this)) // Bind the error handling function to the class scope
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
