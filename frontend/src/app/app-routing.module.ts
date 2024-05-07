import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListeDesProjectsComponent } from './admin-dashboard/liste-des-projects/liste-des-projects.component';
import { ListeUtilisateursComponent } from './admin-dashboard/liste-users/liste-users.component';
import { ChatComponent } from './admin-dashboard/chat/chat.component';
import { SuiviComponent } from './admin-dashboard/suivi/suivi.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { MembreEquipeComponent } from './admin-dashboard/membre-equipe/membre-equipe.component';
import { BatimentAdminComponent } from './admin-dashboard/batiment-admin/batiment-admin.component';
import { InfrastructureComponent } from './admin-dashboard/infrastructure/infrastructure.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'liste-des-projects', component: ListeDesProjectsComponent },
      { path: 'liste-users', component: ListeUtilisateursComponent },
      { path: 'membre-equipe', component: MembreEquipeComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'suivi', component: SuiviComponent },
      { path: 'batiment_admin', component: BatimentAdminComponent },
      { path: 'infrastructure', component: InfrastructureComponent }

 // Modifier le chemin ici
    ]
  },
  
  { path: 'responsable', component: ResponsableDashboardComponent },
  { path: 'member-equipe', component: TeamMemberDashboardComponent },

  { path: 'school', component:SchoolDashboardComponent  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
