import { Component, Inject } from '@angular/core';
import { Book } from '../../models/book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservation-confirm-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reservation-confirm-modal.component.html',
  styleUrl: './reservation-confirm-modal.component.scss',
})
export class ReservationConfirmModalComponent {
  book: Book;

  constructor(
    public dialogRef: MatDialogRef<ReservationConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.book = data.book;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
