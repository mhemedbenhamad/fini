import { Component, OnInit } from '@angular/core';
import { AuthService, LoginResponse } from '../auth.service';
import { NotificationService } from './../notification.service';
import { BackendService } from './../user.data.service';

@Component({
  selector: 'app-gestionnaire-projet-dashboard',
  templateUrl: './gestionnaire-projet-dashboard.component.html',
  styleUrls: ['./gestionnaire-projet-dashboard.component.css']
})
export class GestionnaireProjetDashboardComponent implements OnInit {
  loggedInUser: LoginResponse | null = null;
  activeLink: string = '';
  notifications: string[] = [];
  showNotifications: boolean = false;
  unreadNotificationsCount: number = 0;
  searchQuery: string = '';
  userProfile: any = {};
  userImage: string = '';

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private backendService: BackendService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadNotifications();
    this.fetchLoggedInUserProfile();
  }

  private loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      notifications => this.notifications = notifications,
      error => console.error('Error loading notifications:', error)
    );

    this.notificationService.getUnreadNotificationsCount().subscribe(
      count => this.unreadNotificationsCount = count,
      error => console.error('Error loading unread notifications count:', error)
    );
  }

  private loadUserProfile(): void {
    this.backendService.getUserProfile().subscribe(
      data => {
        this.userProfile = data.profile;
        this.loadUserImage(this.userProfile.id_log);
      },
      error => console.error('Error loading user profile:', error)
    );
  }

  private loadUserImage(userId: string): void {
    const userIdNumber = Number(userId); 
    if (isNaN(userIdNumber)) {
      console.error('Invalid user ID:', userId);
      return;
    }

    this.backendService.getUserImage(userIdNumber).subscribe(
      imageData => this.userImage = imageData.imageData,
      error => console.error('Error loading user image:', error)
    );
  }

  private fetchLoggedInUserProfile(): void {
    this.authService.getProfile().subscribe(
      (profile: LoginResponse | null) => {
        if (profile) {
          this.loggedInUser = profile;
        } else {
          console.warn('Profile not available');
        }
      },
      error => console.error('Error fetching logged-in user profile:', error)
    );
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notificationService.clearLocalStorage();
    }
  }

  toggleFullScreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }
}


