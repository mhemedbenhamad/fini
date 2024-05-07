// amenagement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenagementService {
  private baseUrl = 'http://localhost:3000/amenagement'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  getAllAmenities(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addAmenity(amenityData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, amenityData);
  }

  deleteAmenity(amenityId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${amenityId}`);
  }

  editAmenity(amenityData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${amenityData.id}`, amenityData);
  }
}
