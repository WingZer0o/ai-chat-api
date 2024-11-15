import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { SideBarNavListComponent } from "./shared/components/side-bar-nav-list/side-bar-nav-list.component";
import { MaterialModule } from "./shared/material.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    NavbarComponent,
    SideBarNavListComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  @ViewChild("sidenav")
  public sidenav!: MatSidenav;

  private sideNavOpen: boolean = false;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get("/api/test").subscribe((response) => {
      console.log(response);
    });
  }

  public handleToggleSideNav(): void {
    !this.sideNavOpen ? this.sidenav.open() : this.sidenav.close();
    this.sideNavOpen = !this.sideNavOpen;
  }
}
