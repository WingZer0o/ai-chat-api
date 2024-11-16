import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public readonly $state = {
    isAppInt: signal<boolean>(false),
  };

  constructor() {}
}
