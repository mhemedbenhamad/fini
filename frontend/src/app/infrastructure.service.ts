import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  private apiUrl = 'http://localhost:3000/infrastructures'; // Remplacez YOUR_PORT par le port sur lequel votre API tourne

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer toutes les infrastructures
  getInfrastructures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour récupérer une infrastructure par son ID
  getInfrastructureById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour ajouter une nouvelle infrastructure
  addInfrastructure(newInfrastructure: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newInfrastructure)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour mettre à jour une infrastructure
  updateInfrastructure(id: number, updatedInfrastructure: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updatedInfrastructure)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour supprimer une infrastructure
  deleteInfrastructure(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour gérer les erreurs HTTP
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
