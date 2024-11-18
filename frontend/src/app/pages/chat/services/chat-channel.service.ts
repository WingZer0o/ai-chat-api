import { Injectable, signal } from '@angular/core';
import { ChatChannel } from '../types/chat-channel';

@Injectable({
  providedIn: 'root',
})
export class ChatChannelService {
  public readonly $state = {
    chatChannels: signal<ChatChannel[] | null>(null),
    chatChannelId: signal<number | null>(null),
  };

  constructor() {}
}
