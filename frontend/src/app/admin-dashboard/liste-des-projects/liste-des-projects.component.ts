import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service'; // Import your project service

@Component({
  selector: 'app-liste-des-projets',
  templateUrl: './liste-des-projects.component.html',
  styleUrls: ['./liste-des-projects.component.css']
})
export class ListeDesProjectsComponent implements OnInit {
  projects: any[] = [];
  showEditForm: boolean = false; // Déclaration de la propriété showEditForm et initialisation à false
  selectedProject: any; // Variable to store the selected project for editing
  showAddProjectForm: boolean = false; // Propriété pour afficher le formulaire d'ajout de projet
  newProject: any = {}; // Nouveau projet à ajouter

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(
        (data: any[]) => {
          this.projects = data;
        },
        (error) => {
          console.error('Failed to fetch projects:', error);
        }
      );
  }

  editProject(project: any): void {
    // Assign the selected project to selectedProject variable
    this.selectedProject = project;
    this.showEditForm = true; // Afficher le formulaire de modification
  }

  deleteProject(project: any): void {
    // Call your service method to delete the project
    this.projectService.deleteProject(project.Id_Proj).subscribe(
      (response) => {
        console.log('Project deleted successfully:', response);
        // Reload the list of projects after deletion
        this.getAllProjects();
      },
      (error) => {
        console.error('Failed to delete project:', error);
      }
    );
  }


  submitEdit(): void {
    // Assurez-vous que selectedProject contient l'identifiant du projet
    const projectId = this.selectedProject.Id_Proj;
    
    // Logic to handle submitting the edited project
    // Call your service method to update the project
    this.projectService.updateProject(projectId, this.selectedProject).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
        // Réinitialiser la sélection du projet et masquer le formulaire de modification
        this.selectedProject = null;
        this.showEditForm = false;
      },
      (error) => {
        console.error('Failed to update project:', error);
      }
    );
  }
  
  cancelEdit(): void {
    this.showEditForm = false; // Cacher le formulaire de modification
    // Réinitialiser les valeurs ou effectuer d'autres actions nécessaires pour annuler la modification
  }

  // Fonction pour afficher le formulaire d'ajout de projet
  showAddForm() {
    this.showAddProjectForm = true;
  }

  // Fonction pour ajouter un nouveau projet
  addProject() {
    // Logic to handle adding new project
    // Call your service method to add the new project
    this.projectService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('New project added successfully:', response);
        // Réinitialiser les données du nouveau projet et masquer le formulaire d'ajout
        this.newProject = {};
        this.showAddProjectForm = false;
        // Reload the list of projects
        this.getAllProjects();
      },
      (error) => {
        console.error('Failed to add new project:', error);
      }
    );
  }

  // Fonction pour annuler l'ajout de projet
  cancelAdd() {
    this.showAddProjectForm = false;
    this.newProject = {}; // Réinitialiser les données du nouveau projet
  }
}
