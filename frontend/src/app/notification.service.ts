import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: BehaviorSubject<string[]>;
  private unreadNotificationsCount: BehaviorSubject<number>;

  constructor() {
    // Initialiser les notifications à partir du localStorage
    const storedNotifications = localStorage.getItem('notifications');
    this.notifications = new BehaviorSubject<string[]>(storedNotifications ? JSON.parse(storedNotifications) : []);

    // Initialiser le compteur de notifications non lues
    this.unreadNotificationsCount = new BehaviorSubject<number>(this.notifications.value.length);
  }

  getNotifications() {
    return this.notifications.asObservable();
  }

  getUnreadNotificationsCount() {
    return this.unreadNotificationsCount.asObservable();
  }

  addNotification(notification: string) {
    const currentNotifications = this.notifications.getValue();
    const updatedNotifications = [...currentNotifications, notification];
    this.notifications.next(updatedNotifications);
    this.updateUnreadNotificationsCount();
    // Mettre à jour le localStorage
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  }

  clearNotifications() {
    this.notifications.next([]);
    this.updateUnreadNotificationsCount();
    // Supprimer les données du localStorage
    localStorage.removeItem('notifications');
  }

  private updateUnreadNotificationsCount() {
    const currentNotifications = this.notifications.getValue();
    const unreadCount = currentNotifications.length;
    this.unreadNotificationsCount.next(unreadCount);
  }

  // Fonction pour effacer les données du localStorage lorsque les notifications sont affichées
  clearLocalStorage() {
    localStorage.removeItem('notifications');
  }
}
