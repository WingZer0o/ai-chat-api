import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public readonly $state = {
    isAppInit: signal<boolean>(false),
    doesInitialUserExist: signal<boolean>(false),
  };

  constructor() {}
}
