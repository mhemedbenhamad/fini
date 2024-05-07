// amenagement.component.ts

import { Component, OnInit } from '@angular/core';
import { AmenagementService } from '../../amenagement.service';

@Component({
  selector: 'app-amenagement',
  templateUrl: './amenagement.component.html',
  styleUrls: ['./amenagement.component.css']
})
export class AmenagementComponent implements OnInit {
  amenities: any[] = [];
  amenity: any = {};
  showAddForm: boolean = false;
  showEditForm: boolean = false;

  constructor(private amenagementService: AmenagementService) { }

  ngOnInit(): void {
    this.fetchAmenities();
  }

  fetchAmenities(): void {
    this.amenagementService.getAllAmenities().subscribe(
      amenities => {
        this.amenities = amenities;
      },
      error => {
        console.error('Error fetching amenities:', error);
      }
    );
  }

  addAmenity(amenityData: any): void {
    this.amenagementService.addAmenity(amenityData).subscribe(
      response => {
        console.log('Amenity added successfully:', response);
        this.fetchAmenities();
        this.cancelForm();
      },
      error => {
        console.error('Error adding amenity:', error);
      }
    );
  }

  deleteAmenity(amenityId: number): void {
    this.amenagementService.deleteAmenity(amenityId).subscribe(
      response => {
        console.log('Amenity deleted successfully:', response);
        this.fetchAmenities();
      },
      error => {
        console.error('Error deleting amenity:', error);
      }
    );
  }

  editAmenity(amenity: any): void {
    this.amenity = { ...amenity };
    this.showEditForm = true;
  }

  saveAmenity(): void {
    this.amenagementService.editAmenity(this.amenity).subscribe(
      response => {
        console.log('Amenity updated successfully:', response);
        this.fetchAmenities();
        this.cancelForm();
      },
      error => {
        console.error('Error updating amenity:', error);
      }
    );
  }

  cancelForm(): void {
    this.showAddForm = false;
    this.showEditForm = false;
    this.amenity = {};
  }

  submitForm(): void {
    if (this.showEditForm) {
      this.saveAmenity();
    } else {
      this.addAmenity(this.amenity);
    }
  }
}
