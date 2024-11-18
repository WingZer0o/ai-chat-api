import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ChatChannelComponent } from './components/chat-channel/chat-channel.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ChatChannelComponent,
    ChatMessagesComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  ngOnInit(): void {}
}
