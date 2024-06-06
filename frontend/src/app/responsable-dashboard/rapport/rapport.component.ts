import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';

import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  nomProjet: string = ''; // Variable pour stocker le nom du projet
  projets: any[] = []; // Variable pour stocker la liste des projets
  projetSelectionne: any; // Variable pour stocker les détails du projet sélectionné
  currentDate: Date = new Date(); // Propriété pour stocker la date actuelle

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects(); // Chargez la liste des projets lors de l'initialisation du composant
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe(
      (data: any[]) => {
        this.projets = data;
      },
      error => {
        console.error('Une erreur est survenue lors du chargement des projets:', error);
      }
    );
  }

  selectProjectDetails() {
    // Recherchez le projet sélectionné dans la liste des projets
    this.projetSelectionne = this.projets.find(project => project.Nom_Proj === this.nomProjet);
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont indexés à partir de 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatHeure(date: Date): string {
    const heures = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${heures}:${minutes}`;
  }

  enregistrerPDF() {
    const doc = new jsPDF();
    
    // Début du cadre
    doc.rect(10, 10, 190, 270);
    
    const date = this.formatDate(this.currentDate); // Formater la date actuelle
  
    // Titre du rapport
    doc.setFontSize(16);
    doc.text('Rapport de Suivi de Projet', 105, 20, { align: 'center' });
  
    // Date du jour
    doc.setFontSize(12);
    doc.text(`Date du jour: ${date}`, 20, 30);
  
    // Heure du rapport
    doc.text(`Heure du rapport: ${this.formatHeure(this.currentDate)}`, 20, 40);
  
    // Nom du Projet
    doc.text(`Nom du Projet: ${this.nomProjet}`, 20, 50);
    if (this.projetSelectionne) {
      // Dates de début et de fin
      const dateDebut = new Date(this.projetSelectionne.Date_Deb_Proj).toLocaleDateString();
      const dateFin = new Date(this.projetSelectionne.Date_Fin_Proj).toLocaleDateString();
  
      // Ajoutez d'autres détails du projet au PDF si nécessaire
      doc.text(`Description: ${this.projetSelectionne.Desc_Proj}`, 20, 60);
      doc.text(`Objectifs: ${this.projetSelectionne.Objectifs}`, 20, 70);
      doc.text(`Date de Début: ${dateDebut}`, 20, 80);
      doc.text(`Date de Fin: ${dateFin}`, 20, 90);
      doc.text(`Budget: ${this.projetSelectionne.Budget_Proj}`, 20, 100);
      doc.text(`Statut: ${this.projetSelectionne.Statut_Proj}`, 20, 110);
      // Ajoutez d'autres données du projet au PDF si nécessaire
    }
  
    // Ajouter une zone de texte pour le commentaire
    const commentaire = (document.getElementById('commentaire') as HTMLInputElement).value;
    doc.text(`Commentaire: ${commentaire}`, 20, 130);
  
    // Enregistrement du PDF
    doc.save('rapport_projet.pdf');
  }
}  