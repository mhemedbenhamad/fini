import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SidebarComponent } from './admin-dashboard/sidebar/sidebar.component';
import { NavbarComponent } from './admin-dashboard/navbar/navbar.component';
import { ListeDesProjetsComponent } from './admin-dashboard/liste-des-projets/liste-des-projets.component';
import { ListeAmenagementComponent } from './admin-dashboard/liste-amenagement/liste-amenagement.component';
import { ListeBatimentAdminComponent } from './admin-dashboard/liste-batiment-admin/liste-batiment-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AjouterMembreComponent } from './membresEquipe/ajouter-membre/ajouter-membre.component';
import { ModifierMembreComponent } from './membresEquipe/modifier-membre/modifier-membre.component';
import { SupprimerMembreComponent } from './membresEquipe/supprimer-membre/supprimer-membre.component';
import { AfficherMembreComponent } from './membresEquipe/afficher-membre/afficher-membre.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    TeamMemberDashboardComponent,
    SchoolDashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ListeDesProjetsComponent,
    ListeAmenagementComponent,
    ListeBatimentAdminComponent,
    AjouterMembreComponent,
    ModifierMembreComponent,
    SupprimerMembreComponent,
    AfficherMembreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
