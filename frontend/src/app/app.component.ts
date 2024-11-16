import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AppService } from './app.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { RegisterUserComponent } from './shared/components/register-user/register-user.component';
import { SideBarNavListComponent } from './shared/components/side-bar-nav-list/side-bar-nav-list.component';
import { MaterialModule } from './shared/material.module';
import { AppInitService } from './shared/services/app-init.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    NavbarComponent,
    SideBarNavListComponent,
    ReactiveFormsModule,
    RegisterUserComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;
  private sideNavOpen: boolean = false;

  constructor(
    public appService: AppService,
    private appInitService: AppInitService
  ) {}

  ngOnInit() {
    this.appInitService.start();
  }

  public handleToggleSideNav(): void {
    !this.sideNavOpen ? this.sidenav.open() : this.sidenav.close();
    this.sideNavOpen = !this.sideNavOpen;
  }
}
