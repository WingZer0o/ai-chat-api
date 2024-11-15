import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((x) => x.HomeComponent),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./pages/chat/chat.component').then((x) => x.ChatComponent),
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
];
