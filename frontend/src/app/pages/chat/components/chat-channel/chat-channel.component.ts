import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { ConfirmationComponent } from '../../../../shared/components/confirmation/confirmation.component';
import { SingularValueInputComponent } from '../../../../shared/components/singular-value-input/singular-value-input.component';
import { MaterialModule } from '../../../../shared/material.module';
import { HttpClientService } from '../../../../shared/services/http-client.service';
import { JWTService } from '../../../../shared/services/jwt.service';
import { ChatChannelService } from '../../services/chat-channel.service';
import { ChatChannel } from '../../types/chat-channel';

@Component({
  selector: 'app-chat-channel',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './chat-channel.component.html',
  styleUrl: './chat-channel.component.scss',
})
export class ChatChannelComponent implements OnInit, OnDestroy {
  constructor(
    private matDialog: MatDialog,
    public chatChannelService: ChatChannelService,
    private httpClientService: HttpClientService,
    private jwtService: JWTService
  ) {}

  ngOnInit(): void {
    this.httpClientService
      .getAuthenticated('/api/chat/get-chat-channels-for-user')
      .subscribe({
        next: (response: any) => {
          this.chatChannelService.$state.chatChannels.set(
            response.map((channel: any) => {
              return new ChatChannel(
                channel.id,
                channel.channelName,
                false,
                channel.createdAt,
                channel.modifiedAt
              );
            })
          );
        },
        error: (error) => {},
      });
  }

  ngOnDestroy(): void {}

  public addNewChat(clickEvent: any): void {
    const rect = clickEvent.target.getBoundingClientRect();
    const dialogRef = this.matDialog.open(SingularValueInputComponent, {
      position: { left: `${rect.left}px`, top: `${rect.bottom - 50}px` },
      height: '250px',
    });
    dialogRef.componentInstance.submitEmitter
      .pipe(takeUntil(dialogRef.afterClosed()))
      .subscribe((value: string) => {
        this.addChatChannelToDatabase(dialogRef, value);
      });
  }

  private addChatChannelToDatabase(
    dialogRef: MatDialogRef<SingularValueInputComponent>,
    channelName: string
  ): void {
    let body = { chatChannel: channelName };
    this.httpClientService
      .postAuthenticated('/api/chat/add-chat-channel', body)
      .subscribe({
        next: (response: any) => {
          const newChatChannel = new ChatChannel(
            response.id,
            response.channelName,
            false,
            response.createdAt,
            response.modifiedAt
          );
          let existingChannels = this.chatChannelService.$state.chatChannels();
          existingChannels?.push(newChatChannel);
          existingChannels?.sort((a, b) => b.modifiedAt - a.modifiedAt);
          dialogRef.close();
        },
        error: (error) => {},
      });
    // TODO: hit backend with check
  }

  public deleteChannel(clickEvent: any, chatChannelId: number): void {
    const rect = clickEvent.target.getBoundingClientRect();
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      position: { left: `${rect.left}px`, top: `${rect.bottom - 50}px` },
      height: '200px',
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value.ok) {
        this.httpClientService
          .deleteAuthenticated(
            `/api/chat/delete-chat-channel?chatChannelId=${chatChannelId}`
          )
          .subscribe({
            next: () => {
              let chatChannles = this.chatChannelService.$state.chatChannels();
              if (chatChannles!?.length > 0) {
                chatChannles = chatChannles!.filter(
                  (x) => x.id !== chatChannelId
                );
                this.chatChannelService.$state.chatChannels.set(chatChannles);
              }
            },
          });
      }
    });
  }

  public editChannelName(clickEvent: any, chatChannel: ChatChannel): void {
    const rect = clickEvent.target.getBoundingClientRect();
    const dialogRef = this.matDialog.open(SingularValueInputComponent, {
      position: { left: `${rect.left}px`, top: `${rect.bottom - 50}px` },
      height: '250px',
    });
    dialogRef.componentInstance.input = chatChannel.name;
    dialogRef.componentInstance.submitEmitter
      .pipe(takeUntil(dialogRef.afterClosed()))
      .subscribe((value: string) => {
        this.changeChatChannelName(dialogRef, chatChannel, value);
      });
  }

  public changeChatChannelName(
    dialogRef: MatDialogRef<SingularValueInputComponent>,
    chatChannel: ChatChannel,
    newChannelName: string
  ): void {
    let body = { chatChannelName: newChannelName, id: chatChannel.id };
    this.httpClientService
      .putAuthenticated('/api/chat/change-chat-channel-name', body)
      .subscribe({
        next: (response: any) => {
          chatChannel.modifiedAt = response.modifiedAt;
          chatChannel.name = newChannelName;
          this.chatChannelService.$state
            .chatChannels()
            ?.sort((a, b) => b.modifiedAt - a.modifiedAt);
          dialogRef.close();
        },
      });
  }

  public toggleChatChannelControlsVisible(chatChannelId: number): void {
    let channel = this.chatChannelService.$state
      .chatChannels()
      ?.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = true;
    }
  }

  public toggleChatChannelControlsInvisible(chatChannelId: number): void {
    let channel = this.chatChannelService.$state
      .chatChannels()
      ?.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = false;
    }
  }
}
