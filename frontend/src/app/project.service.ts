import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:3000/project';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProject(project: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/count`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectCountByYear(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/count_annee`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchProjects(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?keyword=${query}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectsInProgress(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/en_cours`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectDetailsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/details/nom/${name}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDelayedProjectsCount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/retards/par_mois_annee`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
