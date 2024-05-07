// building-admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingAdminService {
  private apiUrl = 'http://localhost:3000/batiment_admin/';

  constructor(private http: HttpClient) { }

  getAllBuildings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addBuilding(buildingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, buildingData);
  }

  deleteBuilding(buildingId: string): Observable<any> {
    const url = `${this.apiUrl}/${buildingId}`;
    return this.http.delete<any>(url);
  }

  updateBuilding(buildingId: string, buildingData: any): Observable<any> {
    const url = `${this.apiUrl}/${buildingId}`;
    return this.http.put<any>(url, buildingData);
  }
}
