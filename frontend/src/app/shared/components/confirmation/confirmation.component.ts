import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>) {}

  public okClicked(): void {
    this.dialogRef.close({ ok: true });
  }

  public cancelClicked(): void {
    this.dialogRef.close({ ok: false });
  }
}
