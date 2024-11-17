import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingularValueInputComponent } from './singular-value-input.component';

describe('SingularValueInputComponent', () => {
  let component: SingularValueInputComponent;
  let fixture: ComponentFixture<SingularValueInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingularValueInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingularValueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
