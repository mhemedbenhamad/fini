import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {
  private apiUrl = 'http://localhost:3000/suivi'; // Make sure to replace the URL with your server address

  constructor(private http: HttpClient) { }

  // Function to retrieve all suivi entries from the API
  getSuiviEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Function to add a new suivi entry to the API
  addSuiviEntry(newSuiviEntry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newSuiviEntry).pipe(
      catchError(this.handleError)
    );
  }

  // Function to delete a specific suivi entry from the API using its ID
  deleteSuiviEntry(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Function to update a specific suivi entry in the API using its ID
  updateSuiviEntry(id: number, updatedSuiviEntry: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updatedSuiviEntry).pipe(
      catchError(this.handleError)
    );
  }

  // Function to retrieve suivi entries along with project details from the API
  getSuiviWithProject(): Observable<any[]> {
    const url = `${this.apiUrl}/suivi-projet`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Function to handle HTTP errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
