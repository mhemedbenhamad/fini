import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password)
      .subscribe(
        (loggedIn: boolean) => {
          if (loggedIn) {
            // Connexion réussie, rediriger vers le tableau de bord approprié
            if (this.authService.isAdmin()) {
              this.router.navigate(['/admin']);
            } else if (this.authService.isResponsable()) {
              this.router.navigate(['/responsable']);
            } else if (this.authService.isMemberEquipe()) {
              this.router.navigate(['/membre-equipe']);
            } else if (this.authService.isSchool()) {
              this.router.navigate(['/school']);
            } else {
              // Cas par défaut (le rôle n'est pas valide)
              this.errorMessage = 'Rôle non valide.';
            }
          } else {
            // Échec de la connexion, afficher un message d'erreur
            this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
        },
        (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Une erreur s\'est produite lors de la connexion.';
        }
      );
  }
}
