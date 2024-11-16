import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(private httpClient: HttpClient, private appService: AppService) {}

  public start(): void {
    this.initialzeUser();
  }

  private initialzeUser(): void {
    this.httpClient.get('/api/auth/does-initial-user-exist').subscribe({
      next: (response) => {
        // TODO: other http call to get new token
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
