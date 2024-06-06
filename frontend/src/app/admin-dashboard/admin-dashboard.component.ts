import { Component, OnInit } from '@angular/core';
import { NotificationService } from './../notification.service';
import { BackendService } from './../user.data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeLink: string = '';
  notifications: string[] = [];
  showNotifications: boolean = false;
  unreadNotificationsCount: number = 0;
  searchQuery: string = '';
  userProfile: any = {}; // Pour stocker les informations de profil de l'utilisateur
  userImage: string = ''; // Pour stocker l'URL de l'image de l'utilisateur

  constructor(
    private notificationService: NotificationService,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });

    this.notificationService.getUnreadNotificationsCount().subscribe(count => {
      this.unreadNotificationsCount = count;
    });

    // Appel à la méthode getUserProfile() de votre service BackendService pour récupérer les données de profil de l'utilisateur
    this.backendService.getUserProfile().subscribe(
      data => {
        this.userProfile = data.profile; // Stockez les données de profil de l'utilisateur dans userProfile
        
        // Obtenez l'URL de l'image de l'utilisateur en utilisant son ID
        this.backendService.getUserImage(this.userProfile.id_log).subscribe(
          imageData => {
            this.userImage = imageData.imageData; // Stockez l'URL de l'image de l'utilisateur dans userImage
          },
          error => {
            console.error('Erreur lors de la récupération de l\'image de l\'utilisateur :', error);
          }
        );
      },
      error => {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur :', error);
      }
    );
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.clearLocalStorage();
    }
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
