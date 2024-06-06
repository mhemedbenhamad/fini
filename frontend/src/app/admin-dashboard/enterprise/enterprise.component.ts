import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../../enterprise.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {
  searchQuery: string = '';
  enterprises: any[] = [];
  errorMessage: string = '';
  isAddFormVisible: boolean = false;
  isEditFormVisible: boolean = false;
  newEnterprise: any = {};
  selectedEnterprise: any = {};

  constructor(private enterpriseService: EnterpriseService) { }

  ngOnInit(): void {
    this.getEnterprises();
  }

  // Méthode pour récupérer toutes les entreprises depuis le backend
  getEnterprises(): void {
    this.enterpriseService.getEnterprises()
      .subscribe(
        (enterprises: any[]) => {
          this.enterprises = enterprises;
        },
        (error) => {
          this.errorMessage = 'Failed to fetch enterprise consultancies';
        }
      );
  }

  // Méthode pour rechercher des entreprises par nom
  searchEnterprises(): void {
    if (this.searchQuery.trim() !== '') {
      this.enterpriseService.searchEnterprisesByName(this.searchQuery)
        .subscribe(
          (enterprises: any[]) => {
            this.enterprises = enterprises;
          },
          (error) => {
            this.errorMessage = 'Failed to search enterprise consultancies';
          }
        );
    } else {
      // Si la recherche est vide, récupérer toutes les entreprises
      this.getEnterprises();
    }
  }

  // Méthode pour ajouter une nouvelle entreprise
  addEnterprise(): void {
    this.enterpriseService.addEnterprise(this.newEnterprise)
      .subscribe(
        (response) => {
          console.log(response.message);
          this.getEnterprises();
          this.cancelAdd();
        },
        (error) => {
          this.errorMessage = 'Failed to add enterprise consultancy';
        }
      );
  }

  // Méthode pour éditer une entreprise existante
  startEditEnterprise(enterprise: any): void {
    this.selectedEnterprise = { ...enterprise };
    this.isEditFormVisible = true;
  }

  // Méthode pour mettre à jour une entreprise existante
  updateEnterprise(): void {
    this.enterpriseService.updateEnterprise(this.selectedEnterprise.Id_Entr_Cons, this.selectedEnterprise)
      .subscribe(
        (response) => {
          console.log(response.message);
          this.getEnterprises();
          this.cancelEdit();
        },
        (error) => {
          this.errorMessage = 'Failed to update enterprise consultancy';
        }
      );
  }

  // Méthode pour supprimer une entreprise
  deleteEnterprise(enterpriseId: number): void {
    this.enterpriseService.deleteEnterprise(enterpriseId)
      .subscribe(
        (response) => {
          console.log(response.message);
          this.getEnterprises();
        },
        (error) => {
          this.errorMessage = 'Failed to delete enterprise consultancy';
        }
      );
  }

  // Afficher le formulaire d'ajout
  showAddForm(): void {
    this.newEnterprise = {};
    this.isAddFormVisible = true;
  }

  // Annuler l'ajout
  cancelAdd(): void {
    this.isAddFormVisible = false;
  }

  // Annuler l'édition
  cancelEdit(): void {
    this.isEditFormVisible = false;
  }
}
