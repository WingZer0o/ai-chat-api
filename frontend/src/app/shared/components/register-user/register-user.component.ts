import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
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

  @Output() public registedUserEvent = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  public ngOnDestroy(): void {}

  public handlerRegisterUser(): void {
    if (this.formGroup.valid) {
      this.isSaving = true;
      let body = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value,
      };
      this.httpClient.post('/api/auth/register-first-user', body).subscribe({
        next: (response) => {
          this.isSaving = false;
          this.registedUserEvent.emit();
        },
        error: (error) => {
          this.isSaving = false;
          // TODO: display error message
        },
      });
    }
  }
}
