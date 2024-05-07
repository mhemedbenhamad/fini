// chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOldMessages(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chatRooms/${roomId}/messages`);
  }

  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/users`);
  }

  createChatRoom(user: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/chatRooms`, { user });
  }
}
