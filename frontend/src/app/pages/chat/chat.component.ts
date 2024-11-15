import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { ChatChannel } from './types/chat-channel';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  public chatChannels: ChatChannel[] = [
    {
      id: '0',
      name: 'First Channel',
      controlsVisible: false,
    },
    {
      id: '1',
      name: 'Second Channel',
      controlsVisible: false,
    },
  ];

  ngOnInit(): void {}

  public addNewChat(): void {
    let newChannel = new ChatChannel('2', 'Third Channel', false);
    this.chatChannels.push(newChannel);
  }

  public deleteChannel(chatChannelId: string): void {
    // TODO make api call to delete channel.
    // success after api call
    this.chatChannels = this.chatChannels.filter((x) => x.id !== chatChannelId);
  }

  public toggleChatChannelControlsVisible(chatChannelId: string): void {
    let channel = this.chatChannels.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = true;
    }
  }

  public toggleChatChannelControlsInvisible(chatChannelId: string): void {
    let channel = this.chatChannels.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = false;
    }
  }
}
