import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../project.service'; // Import your project service

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isHidden: boolean = false; // Ajout de la propriété isHidden

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  reloadProjects(): void {
    this.projectService.getAllProjects()
      .subscribe(
        (data: any[]) => {
          // Mettre à jour la liste des projets
          // Vous pouvez stocker les projets dans un service ou une variable de composant pour les rendre disponibles dans d'autres composants
          console.log('Projects reloaded:', data);
        },
        (error) => {
          console.error('Failed to reload projects:', error);
        }
      );
  }

  toggleSidebar(): void {
    this.isHidden = !this.isHidden; // Logique pour basculer la valeur de isHidden
  }
}
