import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './book-modal.component.html',
  styleUrl: './book-modal.component.scss',
})
export class BookModalComponent {
  bookForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book }
  ) {
    this.bookForm = new FormGroup({
      title: new FormControl(data.book ? data.book.title : '', [
        Validators.required,
      ]),
      author: new FormControl(data.book ? data.book.author : '', [
        Validators.required,
      ]),
      year: new FormControl(data.book ? data.book.year : '', [
        Validators.required,
      ]),
      category: new FormControl(data.book ? data.book.category : '', [
        Validators.required,
      ]),
      available_copies: new FormControl(
        data.book ? data.book.available_copies : '',
        [Validators.required]
      ),
    });
  }

  onSave(): void {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
