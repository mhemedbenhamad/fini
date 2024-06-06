import { Component, OnInit } from '@angular/core';
import { ProjectDetailsService } from '../../project-details.service'; // Mettez à jour le chemin si nécessaire

@Component({
  selector: 'app-details-des-projects',
  templateUrl: './details-des-projects.component.html',
  styleUrls: ['./details-des-projects.component.css']
})
export class DetailsDesProjectsComponent implements OnInit {
  selectedProjectId: number = 0; // Initialisation de la propriété
  projectDetails: any;
  errorMessage: string = ''; // Initialisation de la propriété

  constructor(private projectService: ProjectDetailsService) { }

  ngOnInit(): void {
  }

  getProjectDetails(): void {
    this.projectService.getProjectDetailsById(this.selectedProjectId)
      .subscribe(
        (data) => {
          this.projectDetails = data;
          this.errorMessage = ''; // Réinitialiser le message d'erreur en cas de succès
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la récupération des détails du projet.';
          console.error(error);
        }
      );
  }
}
