import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-side-bar-nav-list',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './side-bar-nav-list.component.html',
  styleUrl: './side-bar-nav-list.component.scss',
})
export class SideBarNavListComponent {}
