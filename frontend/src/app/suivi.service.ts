import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {
  private apiUrl = 'http://localhost:3000/suivi'; // Assurez-vous de remplacer l'URL par l'adresse de votre serveur

  constructor(private http: HttpClient) { }

  // Fonction pour récupérer toutes les entrées de suivi depuis l'API
  getSuiviEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fonction pour ajouter une nouvelle entrée de suivi à l'API
  addSuiviEntry(newSuiviEntry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newSuiviEntry).pipe(
      catchError(this.handleError)
    );
  }

  // Fonction pour supprimer une entrée de suivi spécifique de l'API en utilisant son ID
  deleteSuiviEntry(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Fonction pour mettre à jour une entrée de suivi spécifique de l'API en utilisant son ID
  updateSuiviEntry(id: number, updatedSuiviEntry: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updatedSuiviEntry).pipe(
      catchError(this.handleError)
    );
  }

  // Fonction pour gérer les erreurs HTTP
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
