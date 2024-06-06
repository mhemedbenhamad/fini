import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { ListeDesProjectsComponent } from './admin-dashboard/liste-des-projects/liste-des-projects.component';
import { ListeUtilisateursComponent } from './admin-dashboard/liste-users/liste-users.component';
import { AccueilComponent } from './admin-dashboard/accueil/accueil.component';
import { AmenagementComponent } from './admin-dashboard/amenagement/amenagement.component';
import { ResponsableDashboardComponent } from './responsable-dashboard/responsable-dashboard.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { TeamMemberDashboardComponent } from './team-member-dashboard/team-member-dashboard.component';
import { MembreEquipeComponent } from './admin-dashboard/membre-equipe/membre-equipe.component';
import { SuiviComponent } from './admin-dashboard/suivi/suivi.component';
import { BatimentAdminComponent } from './admin-dashboard/batiment-admin/batiment-admin.component';
import { InfrastructureComponent } from './admin-dashboard/infrastructure/infrastructure.component';
import { ListeProjectComponent } from './responsable-dashboard/liste-project/liste-project.component';
import { RapportComponent } from './responsable-dashboard/rapport/rapport.component';
import { GestionnaireProjetDashboardComponent } from './gestionnaire-projet-dashboard/gestionnaire-projet-dashboard.component';
import { DetailsDesProjectsComponent } from './admin-dashboard/details-des-projects/details-des-projects.component';
import { MyprofilComponent } from './responsable-dashboard/myprofil/myprofil.component';
import { AppRoutingModule } from './app-routing.module';
import { SmsComponent } from './admin-dashboard/sms/sms.component';
import { WhatsappComponent } from './admin-dashboard/whatsapp/whatsapp.component';
import { EnterpriseComponent } from './admin-dashboard/enterprise/enterprise.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    LoginComponent,
    ListeDesProjectsComponent,
    ListeUtilisateursComponent,
    AccueilComponent,
    AmenagementComponent,
    ResponsableDashboardComponent,
    SchoolDashboardComponent,
    TeamMemberDashboardComponent,
    MembreEquipeComponent,
    SuiviComponent,
    BatimentAdminComponent,
    InfrastructureComponent,
    ListeProjectComponent,
    RapportComponent,
    GestionnaireProjetDashboardComponent,
    DetailsDesProjectsComponent,
    MyprofilComponent,
    SmsComponent,
    WhatsappComponent,
    EnterpriseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
