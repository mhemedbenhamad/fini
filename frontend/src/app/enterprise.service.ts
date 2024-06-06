import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private apiUrl = 'http://localhost:3000/entreprise_cons';

  constructor(private http: HttpClient) { }

  getEnterprises(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEnterprise(newEnterprise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newEnterprise);
  }

  updateEnterprise(enterpriseId: number, updatedEnterprise: any): Observable<any> {
    const url = `${this.apiUrl}/${enterpriseId}`;
    return this.http.put<any>(url, updatedEnterprise);
  }

  deleteEnterprise(enterpriseId: number): Observable<any> {
    const url = `${this.apiUrl}/${enterpriseId}`;
    return this.http.delete<any>(url);
  }

  searchEnterprisesByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${name}`);
  }
}
