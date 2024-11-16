import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JWTService {
  constructor() {}

  public setToken(token: string) {
    localStorage.setItem('JWT-Token', token);
  }

  public getToken(): string {
    return localStorage.getItem('JWT-Token')!;
  }
}
