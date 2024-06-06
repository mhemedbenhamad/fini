import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../user.data.service';
import { NotificationService } from '../../notification.service';

interface User {
  id_log: number;
  username: string;
  password: string;
  role: string;
  imageURL?: string;
}

@Component({
  selector: 'app-liste-utilisateurs',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.css']
})
export class ListeUtilisateursComponent implements OnInit {
  imageFile: File | null = null;
  newImageFile: File | null = null;
  utilisateurs: User[] = [];
  utilisateurSelectionne: User | null = null;
  nouveauUtilisateur: Partial<User> = {
    username: '',
    password: '',
    role: ''
  };

  afficherFormulaireAjout: boolean = false;
  afficherFormulaireModification: boolean = false;
  roles: string[] = [];

  constructor(private backendService: BackendService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs() {
    this.backendService.getUserData().subscribe(
      (data: User[]) => {
        this.utilisateurs = data;
        this.extractRoles();
        this.loadUserImages(); // Charge les images après avoir reçu les données
      },
      (error) => {
        console.error('An error occurred while loading users:', error);
      }
    );
  }

  extractRoles() {
    const rolesSet = new Set<string>();
    this.utilisateurs.forEach(user => rolesSet.add(user.role));
    this.roles = Array.from(rolesSet);
  }

  ajouterUtilisateur() {
    const { username, password, role } = this.nouveauUtilisateur;
    if (username && password && role && this.imageFile) {
      this.backendService.addUser(username, password, role, this.imageFile).subscribe(
        response => {
          console.log('Utilisateur ajouté avec succès :', response);
          this.chargerUtilisateurs(); // Rechargez les utilisateurs après avoir ajouté un nouvel utilisateur
          this.annulerAjout(); // Masquez le formulaire après avoir ajouté un utilisateur
        },
        error => {
          console.error('Une erreur est survenue lors de l\'ajout de l\'utilisateur :', error);
          if (error.status === 401) {
            alert('Non autorisé : Veuillez vérifier vos informations d\'identification');
          } else {
            alert('Une erreur est survenue lors de l\'ajout de l\'utilisateur');
          }
        }
      );
    } else {
      alert('Veuillez remplir tous les champs et sélectionner une image.');
    }
  }

  annulerAjout() {
    this.afficherFormulaireAjout = false;
    this.nouveauUtilisateur = { username: '', password: '', role: '' }; // Reset form
    this.imageFile = null; // Reset file input
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onNewFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.newImageFile = event.target.files[0];
    }
  }

  modifierUtilisateur() {
    if (this.utilisateurSelectionne) {
      this.backendService.updateUser(
        this.utilisateurSelectionne.id_log,
        this.utilisateurSelectionne.username,
        this.utilisateurSelectionne.password,
        this.utilisateurSelectionne.role,
        this.newImageFile 
      ).subscribe(
        () => {
          this.chargerUtilisateurs();
          this.utilisateurSelectionne = null;
          this.notificationService.addNotification('Utilisateur modifié avec succès.');
          this.annulerModification(); // Masquer le formulaire après la modification d'un utilisateur
        },
        (error) => {
          console.error('Une erreur est survenue lors de la modification de l\'utilisateur :', error);
        }
      );
    }
  }
  
  annulerModification() {
    this.afficherFormulaireModification = false;
    this.utilisateurSelectionne = null; // Désélectionner l'utilisateur
    this.newImageFile = null; // Reset new image file input
  }
  
  supprimerUtilisateur(id_log: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.backendService.deleteUser(id_log).subscribe(
        () => {
          this.chargerUtilisateurs();
          this.notificationService.addNotification('Utilisateur supprimé avec succès.');
        },
        (error) => {
          console.error('An error occurred while deleting user:', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  loadUserImages() {
    this.utilisateurs.forEach(user => {
      this.backendService.getUserImage(user.id_log).subscribe(
        (response: any) => {
          if (response && response.imageData) {
            user.imageURL = response.imageData;
          } else {
            console.error('Invalid image data:', response);
          }
        },
        (error) => {
          console.error('An error occurred while loading user image:', error);
        }
      );
    });
  }

  onNewImageSelected(event: any) {
    this.newImageFile = event.target.files[0];
  }
}
