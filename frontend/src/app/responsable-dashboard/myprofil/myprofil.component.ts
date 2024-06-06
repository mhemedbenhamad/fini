import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { BackendService } from './../../user.data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myprofil',
  templateUrl: './myprofil.component.html',
  styleUrls: ['./myprofil.component.css']
})
export class MyprofilComponent implements OnInit {
  activeLink: string = '';
  notifications: string[] = [];
  showNotifications: boolean = false;
  unreadNotificationsCount: number = 0;
  searchQuery: string = '';
  userProfile: any = {};
  userImage: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  showPasswordForm: boolean = false;
  userId: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.backendService.getUserProfile().subscribe(
      data => {
        this.userProfile = data.profile;
        this.userId = this.userProfile.id_log;
        this.loadUserImage(this.userId);
      },
      error => console.error('Error loading user profile:', error)
    );
  }

  private loadUserImage(userId: number): void {
    this.backendService.getUserImage(userId).subscribe(
      imageData => this.userImage = imageData.imageData,
      error => console.error('Error loading user image:', error)
    );
  }

  resetPassword(): void {
    this.backendService.resetPassword(this.oldPassword, this.newPassword).subscribe(
      response => {
        this.successMessage = 'Mot de passe modifié avec succès';
        this.errorMessage = '';
        this.oldPassword = '';
        this.newPassword = '';
        this.showPasswordForm = false;
      },
      error => {
        this.errorMessage = 'Erreur lors de la réinitialisation du mot de passe';
        this.successMessage = '';
        console.error('Error resetting password:', error);
      }
    );
  }
}
