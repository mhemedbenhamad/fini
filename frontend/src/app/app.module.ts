import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListeDesProjectsComponent } from './admin-dashboard/liste-des-projects/liste-des-projects.component';
import { ListeUtilisateursComponent } from './admin-dashboard/liste-users/liste-users.component';
import { ChatComponent } from './admin-dashboard/chat/chat.component';
import { AmenagementComponent } from './admin-dashboard/amenagement/amenagement.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { MembreEquipeComponent } from './admin-dashboard/membre-equipe/membre-equipe.component';
import { SuiviComponent } from './admin-dashboard/suivi/suivi.component';
import { BatimentAdminComponent } from './admin-dashboard/batiment-admin/batiment-admin.component';
import { InfrastructureComponent } from './admin-dashboard/infrastructure/infrastructure.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LoginComponent,
    ListeDesProjectsComponent,
    ListeUtilisateursComponent,
    ChatComponent,
    AmenagementComponent,
    ResponsableDashboardComponent,
    SchoolDashboardComponent,
    TeamMemberDashboardComponent,
    MembreEquipeComponent,
    SuiviComponent,
    BatimentAdminComponent,
    InfrastructureComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule// Ajoutez FormsModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
