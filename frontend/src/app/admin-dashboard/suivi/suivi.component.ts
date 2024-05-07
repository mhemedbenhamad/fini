import { Component, OnInit } from '@angular/core';
import { SuiviService } from '../../suivi.service';
import { NgForm } from '@angular/forms'; // Importez NgForm depuis @angular/forms

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.css']
})
export class SuiviComponent implements OnInit {
  suiviEntries: any[] = [];
  newSuiviEntry: any = {};
  selectedSuiviEntry: any = {};
  isEditMode: boolean = false; // Déclaration de la propriété isEditMode
  editForm: any; // Déclaration de la propriété editForm
  showForm: boolean = false;




  constructor(private suiviService: SuiviService) { }

  ngOnInit(): void {
    this.getSuiviEntries();
  }

  // Fonction pour récupérer toutes les entrées de suivi
  getSuiviEntries(): void {
    this.suiviService.getSuiviEntries()
      .subscribe(entries => {
        this.suiviEntries = entries;
      });
  }

  // Fonction pour ajouter une nouvelle entrée de suivi
  addSuiviEntry(): void {
    this.suiviService.addSuiviEntry(this.newSuiviEntry)
      .subscribe(() => {
        this.getSuiviEntries();
        this.newSuiviEntry = {}; // Réinitialise le formulaire après l'ajout
      });
  }

  // Fonction pour supprimer une entrée de suivi
  deleteSuiviEntry(id: number): void {
    this.suiviService.deleteSuiviEntry(id)
      .subscribe(() => {
        this.getSuiviEntries();
      });
  }

// Fonction pour mettre à jour une entrée de suivi
updateSuiviEntry(updatedSuiviEntry: any): void {
  this.suiviService.updateSuiviEntry(this.selectedSuiviEntry.Id_Suiv, updatedSuiviEntry)
    .subscribe(() => {
      this.getSuiviEntries();
      this.isEditMode = false;
    });
}



  // Fonction pour passer en mode édition et remplir les champs du formulaire avec les données de l'entrée sélectionnée
  editSuiviEntry(entry: any): void {
    this.selectedSuiviEntry = { ...entry }; // Copie profonde de l'objet
    this.isEditMode = true;
  }

  // Fonction pour annuler le mode édition
  cancelEdit(): void {
    this.isEditMode = false;
    this.selectedSuiviEntry = {};
  }
  toggleForm(): void {
    this.showForm = !this.showForm;
  }
  cancelForm(): void {
    this.showForm = false;
    // Réactiver le défilement de la page
    document.body.style.overflow = 'auto';
  }
  editEntry(entry: any): void {
    this.selectedSuiviEntry = { ...entry }; // Copie profonde de l'objet
    this.isEditMode = true;
  }
}
  

