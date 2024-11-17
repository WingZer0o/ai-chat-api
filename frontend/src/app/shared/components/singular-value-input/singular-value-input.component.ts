import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-singular-value-input',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './singular-value-input.component.html',
  styleUrl: './singular-value-input.component.scss',
})
export class SingularValueInputComponent implements OnInit {
  public form!: FormGroup;
  public isSaving: boolean = false;

  @Input() public input!: string;

  @Output() public submitEmitter = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      value: [this.input, Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.isSaving = true;
      this.submitEmitter.emit(this.form.get('value')?.value);
    } else {
      // TODO: add toast message for not valid
    }
  }
}
