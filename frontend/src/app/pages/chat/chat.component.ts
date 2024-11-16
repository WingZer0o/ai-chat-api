import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ChatChannelComponent } from './components/chat-channel/chat-channel.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MaterialModule, ChatChannelComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  ngOnInit(): void {}
}
