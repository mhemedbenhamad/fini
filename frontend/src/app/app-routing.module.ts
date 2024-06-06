import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ListeDesProjectsComponent } from './admin-dashboard/liste-des-projects/liste-des-projects.component';
import { ListeUtilisateursComponent } from './admin-dashboard/liste-users/liste-users.component';
import { AccueilComponent } from './admin-dashboard/accueil/accueil.component';
import { SuiviComponent } from './admin-dashboard/suivi/suivi.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { MembreEquipeComponent } from './admin-dashboard/membre-equipe/membre-equipe.component';
import { BatimentAdminComponent } from './admin-dashboard/batiment-admin/batiment-admin.component';
import { InfrastructureComponent } from './admin-dashboard/infrastructure/infrastructure.component';
import { ListeProjectComponent } from './responsable-dashboard/liste-project/liste-project.component';
import { RapportComponent } from './responsable-dashboard/rapport/rapport.component';
import { GestionnaireProjetDashboardComponent } from './gestionnaire-projet-dashboard/gestionnaire-projet-dashboard.component';
import { DetailsDesProjectsComponent } from './admin-dashboard/details-des-projects/details-des-projects.component';
import { MyprofilComponent } from './responsable-dashboard/myprofil/myprofil.component';
import { WhatsappComponent } from './admin-dashboard/whatsapp/whatsapp.component';
import { EnterpriseComponent } from './admin-dashboard/enterprise/enterprise.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }, // Redirection vers la page d'administration par défaut
  {
    path: 'admin', component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' }, // Redirection vers la page de chat par défaut dans le tableau de bord admin
      { path: 'liste-des-projects', component: ListeDesProjectsComponent },
      { path: 'liste-users', component: ListeUtilisateursComponent },
      { path: 'membre-equipe', component: MembreEquipeComponent },
      { path: 'accueil', component: AccueilComponent },
      { path: 'suivi', component: SuiviComponent },
      { path: 'batiment_admin', component: BatimentAdminComponent },
      { path: 'infrastructure', component: InfrastructureComponent },
      { path: 'details-des-projects', component: DetailsDesProjectsComponent },
      { path: 'whatsapp', component: WhatsappComponent },
      { path: 'enterprise', component: EnterpriseComponent },

    ]
  },
 // Modifier le chemin ici
    
  
  { 
    path: 'gestionnaire-projet',
    component: GestionnaireProjetDashboardComponent,
    children: [
      { path: 'liste-des-projects', component: ListeDesProjectsComponent },
      { path: 'liste-users', component: ListeUtilisateursComponent },
      { path: 'membre-equipe', component: MembreEquipeComponent },
      { path: 'accueil', component: AccueilComponent },
      { path: 'suivi', component: SuiviComponent },
      { path: 'batiment_admin', component: BatimentAdminComponent },
      { path: 'infrastructure', component: InfrastructureComponent },
      { path: 'myprofil', component: MyprofilComponent },
      { path: 'enterprise', component: EnterpriseComponent },

 // Modifier le chemin ici
    ]
  },
  { path: 'responsable', component: ResponsableDashboardComponent , children: [
    { path: 'liste-project', component: ListeProjectComponent },
    { path: 'membre-equipe', component: MembreEquipeComponent },
    { path: 'suivi', component: SuiviComponent },
    { path: 'rapport', component: RapportComponent },
    { path: 'myprofil', component: MyprofilComponent }

    ]
  },
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
