import { Component, OnInit } from '@angular/core';
import { WhatsappService } from '../../whatsapp.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {
  numberControl = new FormControl('');
  message: string = '';
  chatMessages: any[] = [];

  constructor(private whatsappService: WhatsappService) {}

  ngOnInit() {
    this.numberControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(number => this.whatsappService.getChatMessages(number || '')) // Utilisez un opérateur de navigation sécurisé
    ).subscribe(
      data => {
        this.chatMessages = data.messages || [];
        console.log('Messages de chat:', this.chatMessages);
      },
      error => {
        console.error('Erreur lors de la récupération des messages de chat:', error);
      }
    );
  }

  sendMessage() {
    const number = this.numberControl.value || ''; // Utilisez un opérateur de navigation sécurisé
    if (number && this.message) {
      this.whatsappService.sendMessage(number, this.message).subscribe(
        response => {
          console.log('Message envoyé avec succès:', response);
          this.message = ''; // Reset message input after sending
        },
        error => {
          console.error('Erreur lors de l\'envoi du message:', error);
        }
      );
    }
  }
}
