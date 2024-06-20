import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../core/services/review.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './book-details-modal.component.html',
  styleUrl: './book-details-modal.component.scss',
})
export class BookDetailsModalComponent implements OnInit {
  book: Book;
  reviews: any[] = [];
  newReview = {
    rating: 0,
    comment: '',
  };

  constructor(
    public dialogRef: MatDialogRef<BookDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private reviewService: ReviewService
  ) {
    this.book = data.book;
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviewsByBook(this.book.id!).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  submitReview(): void {
    if (this.newReview.rating > 0 && this.newReview.comment) {
      this.reviewService
        .addReview(this.book.id!, this.newReview.rating, this.newReview.comment)
        .subscribe(() => {
          this.loadReviews();
          this.newReview = { rating: 0, comment: '' };
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
