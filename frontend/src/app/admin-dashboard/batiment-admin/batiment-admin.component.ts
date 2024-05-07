import { Component, OnInit } from '@angular/core';
import { BuildingAdminService } from '../../batiment-admin.service'; // Assurez-vous de spécifier le chemin correct
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-batiment_admin',
  templateUrl: './batiment-admin.component.html',
  styleUrls: ['./batiment-admin.component.css']
})
export class BatimentAdminComponent implements OnInit {
  buildings: any[] = [];
  newBuildingData: any = {};
  errorMessage: string = '';
  showForm: boolean = false;
  showEdit: boolean = false;
  editedBuilding: any = {};

  constructor(private buildingService: BuildingAdminService) { }

  ngOnInit(): void {
    this.getBuildings();
  }

  getBuildings(): void {
    this.buildingService.getAllBuildings()
      .subscribe(
        (buildings: any[]) => {
          this.buildings = buildings;
        },
        (error) => {
          this.errorMessage = 'Error fetching buildings: ' + error.message;
        }
      );
  }

  addBuilding(): void {
    this.buildingService.addBuilding(this.newBuildingData)
      .subscribe(
        (response) => {
          this.getBuildings(); // Actualiser la liste des bâtiments après l'ajout
          this.newBuildingData = {}; // Effacer les données du nouveau bâtiment
          this.showForm = false; // Cacher le formulaire d'ajout après l'ajout réussi
        },
        (error) => {
          this.errorMessage = 'Error adding building: ' + error.message;
        }
      );
  }

  deleteBuilding(buildingId: string): void {
    this.buildingService.deleteBuilding(buildingId)
      .subscribe(
        (response) => {
          this.getBuildings(); // Actualiser la liste des bâtiments après la suppression
        },
        (error) => {
          this.errorMessage = 'Error deleting building: ' + error.message;
        }
      );
  }

  updateBuilding(): void {
    this.buildingService.updateBuilding(this.editedBuilding.Id_Infra_Str, this.editedBuilding)
      .subscribe(
        (response) => {
          this.getBuildings(); // Actualiser la liste des bâtiments après la mise à jour
          this.showEdit = false; // Cacher le formulaire de modification après la mise à jour réussie
          this.editedBuilding = {}; // Réinitialiser les données du bâtiment édité
        },
        (error) => {
          this.errorMessage = 'Error updating building: ' + error.message;
        }
      );
  }

  showAddForm(): void {
    this.showForm = true;
  }

  cancelAdd(): void {
    this.showForm = false;
    this.resetFormData();
  }

  resetFormData(): void {
    this.newBuildingData = {};
  }

  showEditForm(building: any): void {
    this.showEdit = true;
    this.editedBuilding = { ...building };
  }

  cancelEdit(): void {
    this.showEdit = false;
    this.editedBuilding = {};
  }
}
