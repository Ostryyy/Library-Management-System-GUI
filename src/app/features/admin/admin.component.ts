import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BookService } from '../../core/services/book.service';
import { ReservationService } from '../../core/services/reservation.service';
import { Book } from '../../models/book';
import { Reservation } from '../../models/reservation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  reservations: Reservation[] = [];

  displayedColumns: string[] = ['username', 'reservationDate', 'actions'];

  subs$: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = [];
    this.subs$.add(
      this.bookService.getAllBooks().subscribe((books) => {
        this.books = books;
      })
    );
  }

  onBookChange(): void {
    this.reservations = [];
    if (this.selectedBook) {
      this.subs$.add(
        this.reservationService
          .getReservationsByBook(this.selectedBook.id!)
          .subscribe((reservations) => {
            this.reservations = reservations;
          })
      );
    }
  }

  cancelReservation(reservationId: string): void {
    this.subs$.add(
      this.reservationService.cancelReservation(reservationId).subscribe(() => {
        if (this.selectedBook) {
          this.onBookChange();
        }
      })
    );
  }
}
