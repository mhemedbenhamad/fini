import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private baseUrl = 'http://localhost:3000'; // Modifier l'URL de base en fonction de votre configuration

  constructor(private http: HttpClient) { }

  // Récupérer tous les membres d'équipe
  getAllTeamMembers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/membre_equipe/membre_equipe_et_login`);
  }

  // Ajouter un nouveau membre d'équipe
  addTeamMember(memberData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/membre_equipe/add`, memberData);
  }

  // Mettre à jour un membre d'équipe existant
  updateTeamMember(memberId: number, memberData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/membre_equipe/update/${memberId}`, memberData);
  }

  // Supprimer un membre d'équipe
  deleteTeamMember(memberId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/membre_equipe/${memberId}`);
  }

  // Récupérer tous les membres d'équipe avec leurs informations de connexion
  getAllTeamMembersWithLoginInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/membre_equipe_et_login`);
  }

  // Récupérer un membre d'équipe avec ses informations de connexion par son ID
  getTeamMemberWithLoginInfo(memberId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/membre_equipe_login/${memberId}`);
  }

  // Mettre à jour à la fois le membre d'équipe et les informations de connexion
  updateTeamMemberAndLogin(memberId: number, memberData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifier_membre_login/${memberId}`, memberData);
  }
}
