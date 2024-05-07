import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../user.data.service';

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUtilisateursComponent implements OnInit {

  utilisateurs: any[] = [];
  utilisateurSelectionne: any = null;
  nouveauUtilisateur: any = {
    username: '',
    password: '',
    role: ''
  };

  afficherFormulaireAjout: boolean = false;
  afficherFormulaireModification: boolean = false;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.backendService.getUserData().subscribe(
      (data) => {
        this.utilisateurs = data;
      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des utilisateurs:', error);
      }
    );
  }

  ajouterUtilisateur() {
    this.backendService.addUser(this.nouveauUtilisateur.username, this.nouveauUtilisateur.password, this.nouveauUtilisateur.role).subscribe(
      () => {
        this.chargerUtilisateurs();
        this.nouveauUtilisateur = { username: '', password: '', role: '' };
        this.afficherFormulaireAjout = false; // Close the form after adding user
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }
  

  modifierUtilisateur() {
    if (this.utilisateurSelectionne) {
      this.backendService.updateUser(
        this.utilisateurSelectionne.id_log,
        this.utilisateurSelectionne.username,
        this.utilisateurSelectionne.password,
        this.utilisateurSelectionne.role
      ).subscribe(
        () => {
          this.chargerUtilisateurs();
          this.utilisateurSelectionne = null;
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la modification de l\'utilisateur:', error);
        }
      );
    }
  }

  supprimerUtilisateur(id_log: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.backendService.deleteUser(id_log).subscribe(
        () => {
          this.chargerUtilisateurs();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }
  annulerAjout() {
    this.afficherFormulaireAjout = false;
  }
  
  annulerModification() {
    this.afficherFormulaireModification = false;
  }
}
