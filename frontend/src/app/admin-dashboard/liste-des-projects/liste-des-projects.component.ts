import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service'; // Importez votre service de projet

@Component({
  selector: 'app-liste-des-projets',
  templateUrl: './liste-des-projects.component.html',
  styleUrls: ['./liste-des-projects.component.css']
})
export class ListeDesProjectsComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = []; // Ajoutez une nouvelle propriété pour les projets filtrés
  showEditForm: boolean = false; 
  selectedProject: any; 
  showAddProjectForm: boolean = false; 
  newProject: any = {};
  searchText: string = ''; // Ajoutez la propriété searchText pour la recherche
  clearSearch: boolean = false; // Déclarez la propriété clearSearch
  showInProgressProjects: boolean = false; // Propriété pour afficher les projets en cours
  sortColumn: string = ''; // Propriété pour stocker la colonne de tri
  sortDirection: string = 'asc'; // Propriété pour stocker la direction de tri
  filterActive: boolean = false;
  sortByField: string = '';
  reverseSort: boolean = false;
 
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    if (this.showInProgressProjects) {
      this.getInProgressProjects(); // Appelez getInProgressProjects() si showInProgressProjects est vrai
    } else {
      this.projectService.getAllProjects()
        .subscribe(
          (data: any[]) => {
            this.projects = data;
            this.filterProjects(); // Filtrer les projets après les avoir récupérés
          },
          (error) => {
            console.error('Failed to fetch projects:', error);
          }
        );
    }
  }

  getInProgressProjects(): void {
    this.projectService.getProjectsInProgress() // Utilisez la méthode getProjectsInProgress() du service
      .subscribe(
        (data: any[]) => {
          this.projects = data;
          this.filterProjects(); // Filtrer les projets après les avoir récupérés
        },
        (error) => {
          console.error('Failed to fetch in-progress projects:', error);
        }
      );
  }

  toggleInProgressProjects(): void {
    this.showInProgressProjects = !this.showInProgressProjects;
    this.getAllProjects();
  }

  editProject(project: any): void {
    this.selectedProject = project;
    this.showEditForm = true; 
  }

  deleteProject(project: any): void {
    this.projectService.deleteProject(project.Id_Proj).subscribe(
      (response) => {
        console.log('Project deleted successfully:', response);
        this.getAllProjects();
      },
      (error) => {
        console.error('Failed to delete project:', error);
      }
    );
  }

  submitEdit(): void {
    const projectId = this.selectedProject.Id_Proj;
    this.projectService.updateProject(projectId, this.selectedProject).subscribe(
      (response) => {
        console.log('Project updated successfully:', response);
        this.selectedProject = null;
        this.showEditForm = false;
        this.getAllProjects();
      },
      (error) => {
        console.error('Failed to update project:', error);
      }
    );
  }
  
  cancelEdit(): void {
    this.showEditForm = false; 
  }

  showAddForm() {
    this.showAddProjectForm = true;
  }

  addProject() {
    this.projectService.addProject(this.newProject).subscribe(
      (response) => {
        console.log('New project added successfully:', response);
        this.newProject = {};
        this.showAddProjectForm = false;
        this.getAllProjects();
      },
      (error) => {
        console.error('Failed to add new project:', error);
      }
    );
  }

  cancelAdd() {
    this.showAddProjectForm = false;
    this.newProject = {}; 
  }

  // Fonction de recherche
  searchProjects() {
    if (this.searchText.trim() !== '') {
      this.projectService.searchProjects(this.searchText).subscribe(
        (data: any[]) => {
          this.projects = data;
          this.filterProjects(); // Filtrer les projets après la recherche
        },
        (error) => {
          console.error('Failed to search projects:', error);
        }
      );
    } else {
      this.getAllProjects(); // Si la recherche est vide, afficher tous les projets
    }
  }

  // Méthode pour trier les données en fonction de la colonne cliquée
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filterProjects(); // Réappliquer le filtre après le tri
  }

  // Méthode pour filtrer les données en fonction des critères de filtrage
  filterProjects() {
    // Cloner les données d'origine
    this.filteredProjects = this.projects.slice(); 
    
    // Filtrer les projets en fonction du texte de recherche
    if (this.searchText.trim() !== '') {
      this.filteredProjects = this.filteredProjects.filter(project => {
        // Vérifier si le texte de recherche est présent dans les propriétés du projet
        return Object.values(project).some((value: any) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(this.searchText.toLowerCase());
          }
          return false;
        });
      });
      this.filterActive = true; // Définir le filtrage actif
    } else {
      this.filterActive = false; // Définir le filtrage inactif
    }
  
    // Trier les projets en fonction de la colonne et de la direction de tri
    if (this.sortColumn) {
      this.filteredProjects.sort((a, b) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    // Appliquer le style pour les colonnes du tableau lors du filtrage actif
    this.applyFilteredColumnStyle();
  }
  
  // Fonction pour appliquer le style aux colonnes du tableau lors du filtrage actif
// Fonction pour appliquer le style aux colonnes du tableau lors du filtrage actif
applyFilteredColumnStyle() {
  const tableHeaders = document.querySelectorAll('.table-striped thead th');
  if (this.filterActive) {
    tableHeaders.forEach(header => {
      header.classList.add('bg-warning'); // Ajouter la classe Bootstrap pour le fond jaune
    });
  } else {
    tableHeaders.forEach(header => {
      header.classList.remove('bg-warning'); // Supprimer la classe Bootstrap pour le fond jaune
    });
  }
}

  
  // Fonction pour appliquer le style aux cellules du tableau lors du filtrage actif
  applyFilteredCellStyle() {
    if (this.filterActive) {
      const tableRows = document.querySelectorAll('.table-striped tbody tr');
      tableRows.forEach(row => {
        row.classList.add('filtered-cell');
      });
    } else {
      const filteredRows = document.querySelectorAll('.table-striped tbody tr.filtered-cell');
      filteredRows.forEach(row => {
        row.classList.remove('filtered-cell');
      });
    }
  }
  


}
