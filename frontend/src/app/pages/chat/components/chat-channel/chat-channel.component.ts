import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SingularValueInputComponent } from '../../../../shared/components/singular-value-input/singular-value-input.component';
import { MaterialModule } from '../../../../shared/material.module';
import { JWTService } from '../../../../shared/services/jwt.service';
import { ChatChannel } from '../../types/chat-channel';

@Component({
  selector: 'app-chat-channel',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './chat-channel.component.html',
  styleUrl: './chat-channel.component.scss',
})
export class ChatChannelComponent implements OnInit, OnDestroy {
  public chatChannels: ChatChannel[] = [];

  private onDestroy$ = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
    private jwtService: JWTService
  ) {}

  ngOnInit(): void {
    this.httpClient
      .get('/api/chat/get-chat-channels-for-user', {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.jwtService.getToken()}`
        ),
      })
      .subscribe({
        next: (response: any) => {
          this.chatChannels = response.map((channel: any) => {
            return new ChatChannel(
              channel.id,
              channel.channelName,
              false,
              channel.createdAt,
              channel.modifiedAt
            );
          });
        },
        error: (error) => {},
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public addNewChat(clickEvent: any): void {
    const rect = clickEvent.target.getBoundingClientRect();
    const dialogRef = this.matDialog.open(SingularValueInputComponent, {
      position: { left: `${rect.left}px`, top: `${rect.bottom - 50}px` },
      height: '250px',
    });
    dialogRef.componentInstance.submitEmitter
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value: string) => {
        this.addChatChannelToDatabase(dialogRef, value);
      });
  }

  private addChatChannelToDatabase(
    dialogRef: MatDialogRef<SingularValueInputComponent>,
    channelName: string
  ): void {
    let body = { chatChannel: channelName };
    this.httpClient
      .post('/api/chat/add-chat-channel', body, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.jwtService.getToken()}`
        ),
      })
      .subscribe({
        next: (response: any) => {
          const newChatChannel = new ChatChannel(
            response.id,
            response.channelName,
            false,
            response.createdAt,
            response.modifiedAt
          );
          this.chatChannels.push(newChatChannel);
          this.chatChannels.sort((a, b) => b.modifiedAt - a.modifiedAt);
          dialogRef.close();
        },
        error: (error) => {},
      });
    // TODO: hit backend with check
  }

  public deleteChannel(chatChannelId: number): void {
    this.httpClient
      .delete(`/api/chat/delete-chat-channel?chatChannelId=${chatChannelId}`, {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.jwtService.getToken()}`
        ),
      })
      .subscribe(() => {});
    this.chatChannels = this.chatChannels.filter((x) => x.id !== chatChannelId);
  }

  public toggleChatChannelControlsVisible(chatChannelId: number): void {
    let channel = this.chatChannels.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = true;
    }
  }

  public toggleChatChannelControlsInvisible(chatChannelId: number): void {
    let channel = this.chatChannels.find((x) => x.id === chatChannelId);
    if (channel) {
      channel.controlsVisible = false;
    }
  }
}
