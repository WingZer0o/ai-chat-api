import { Component } from '@angular/core';
import { MaterialModule } from '../../../../shared/material.module';
import { ChatMessageService } from '../../services/chat-message.service';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.scss',
})
export class ChatMessagesComponent {
  constructor(private chatMessageService: ChatMessageService) {}
}
