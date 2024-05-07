// Importation des modules HttpClient et Injectable depuis @angular/common/http
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // URL de base de votre backend
  private baseUrl = 'http://localhost:3000/login'; // Remplacez ceci par l'URL réelle de votre backend

  constructor(private http: HttpClient) { }


  // Méthode pour récupérer les données utilisateur
  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/data`);
  }

  // Méthode pour ajouter un utilisateur
  addUser(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user/add`, { username, password, role });
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(id: number, username: string, password: string, role: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, { username, password, role });
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/user/delete/${id}`);
  }
}
