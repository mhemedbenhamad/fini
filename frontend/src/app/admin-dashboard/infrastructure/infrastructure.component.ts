import { Component, OnInit } from '@angular/core';
import { InfrastructureService } from '../../infrastructure.service';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})
export class InfrastructureComponent implements OnInit {
  infrastructures: any[] = [];
  newInfrastructure: any = {};
  selectedInfrastructure: any = {};
  addingInfrastructure: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private infrastructureService: InfrastructureService) { }

  ngOnInit(): void {
    this.getInfrastructures();
  }

  getInfrastructures(): void {
    this.infrastructureService.getInfrastructures()
      .subscribe(
        (infrastructures) => {
          this.infrastructures = infrastructures;
        },
        (error) => {
          console.error('Erreur lors de la récupération des infrastructures :', error);
        }
      );
  }

  addInfrastructure(): void {
    this.infrastructureService.addInfrastructure(this.newInfrastructure)
      .subscribe(
        (response) => {
          this.successMessage = 'Nouvelle infrastructure ajoutée avec succès. ID: ' + response.infrastructureId;
          this.newInfrastructure = {};
          this.getInfrastructures();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de l\'ajout de l\'infrastructure : ' + error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  updateInfrastructure(): void {
    this.infrastructureService.updateInfrastructure(this.selectedInfrastructure.Id_Infra_Str, this.selectedInfrastructure)
      .subscribe(
        () => {
          this.successMessage = 'Infrastructure mise à jour avec succès.';
          this.selectedInfrastructure = {};
          this.getInfrastructures();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la mise à jour de l\'infrastructure : ' + error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  deleteInfrastructure(id: number): void {
    this.infrastructureService.deleteInfrastructure(id)
      .subscribe(
        () => {
          this.successMessage = 'Infrastructure supprimée avec succès.';
          this.getInfrastructures();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'infrastructure : ' + error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  selectInfrastructure(infrastructure: any): void {
    this.selectedInfrastructure = { ...infrastructure };
  }

  toggleAddForm(): void {
    this.addingInfrastructure = !this.addingInfrastructure;
    this.successMessage = '';
    this.errorMessage = '';
  }

  resetForm() {
    this.addingInfrastructure = false;
    this.successMessage = '';
    this.errorMessage = '';
    // Réinitialisez également les valeurs des champs si nécessaire
  }

  closeAlert(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
