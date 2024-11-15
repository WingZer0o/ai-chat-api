import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarNavListComponent } from './side-bar-nav-list.component';

describe('SideBarNavListComponent', () => {
  let component: SideBarNavListComponent;
  let fixture: ComponentFixture<SideBarNavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarNavListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
