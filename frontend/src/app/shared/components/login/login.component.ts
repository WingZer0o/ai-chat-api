import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../../../app.service';
import { MaterialModule } from '../../material.module';
import { JWTService } from '../../services/jwt.service';
import { passwordValidator } from '../../validator/form-validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public isSaving: boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private appService: AppService,
    private jwtService: JWTService
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      password: [null, [Validators.required, passwordValidator]],
    });
    this.httpClient
      .get('/api/auth/is-token-valid', {
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.jwtService.getToken()}`
        ),
      })
      .subscribe({
        next: (response) => {
          this.appService.$state.isAppInit.set(true);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public ngOnDestroy(): void {}

  public handleLogin(): void {
    if (this.formGroup.valid) {
      this.isSaving = true;
      let body = { password: this.formGroup.get('password')?.value };
      this.httpClient.post('/api/auth/login', body).subscribe({
        next: (response: any) => {
          this.isSaving = false;
          this.jwtService.setToken(response.token);
          this.appService.$state.isAppInit.set(true);
        },
        error: (error) => {
          this.isSaving = false;
          // TODO: display error
        },
      });
    }
  }
}
