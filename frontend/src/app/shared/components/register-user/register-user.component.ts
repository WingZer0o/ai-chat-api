import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material.module';
import {
  emailValidator,
  passwordValidator,
} from '../../validator/form-validator';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public isSaving: boolean = false;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  public ngOnDestroy(): void {}

  public handlerRegisterUser(): void {
    this.isSaving = !this.isSaving;
  }
}
