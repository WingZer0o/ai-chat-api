import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output()
  public toggleSideNavEmitter = new EventEmitter();

  public toggleSideNav(): void {
    this.toggleSideNavEmitter.emit();
  }
}
