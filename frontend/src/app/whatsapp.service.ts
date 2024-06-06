import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  private apiUrl = 'http://localhost:5000'; // URL du serveur WhatsApp

  constructor(private http: HttpClient) { }

  sendMessage(number: string, message: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { number, message };
    return this.http.post(`${this.apiUrl}/send-message`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  getMessages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages`)
      .pipe(catchError(this.handleError));
  }

  getChatMessages(number: string): Observable<any> {
    return timer(0, 5000).pipe( // Timer pour rafraîchir toutes les 5 secondes
      switchMap(() => this.http.get(`${this.apiUrl}/chats/${number}`))
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
