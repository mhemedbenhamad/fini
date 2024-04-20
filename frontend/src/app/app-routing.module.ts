import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SidebarComponent } from './admin-dashboard/sidebar/sidebar.component'; // Import du composant de la barre latérale

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'sidebar', component: SidebarComponent }, // Route pour afficher la barre latérale
      // Autres routes enfants de l'administration si nécessaire
    ]
  },
  { path: 'responsable', component: ManagerDashboardComponent },
  { path: 'membre-equipe', component: TeamMemberDashboardComponent },
  { path: 'school', component: SchoolDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirection par défaut vers la page de connexion pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
