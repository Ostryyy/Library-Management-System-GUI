import { CommonModule } from '@angular/common';
import { Component, computed, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../models/book';
import { isLoggedIn } from '../../core/signals/auth.signal';
import { BookService } from '../../core/services/book.service';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { ReservationConfirmModalComponent } from '../reservation-confirm-modal/reservation-confirm-modal.component';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ReservationService } from '../../core/services/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnDestroy {
  books: Book[] = [];
  reservations: Reservation[] = [];
  isAdmin: boolean = false;
  isLoggedIn = computed(() => isLoggedIn());

  subs$: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private reservationService: ReservationService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadReservations();
    this.checkUserRole();
  }

  loadBooks(): void {
    this.books = [];
    this.subs$.add(
      this.bookService.getAllBooks().subscribe((books) => {
        this.books = books;
      })
    );
  }

  loadReservations(): void {
    this.reservations = [];
    this.subs$.add(
      this.reservationService
        .getUserReservations()
        .subscribe((reservations) => {
          this.reservations = reservations;
        })
    );
  }

  checkUserRole(): void {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'admin';
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: { book: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subs$.add(
          this.bookService.createBook(result).subscribe(() => {
            this.loadBooks();
          })
        );
      }
    });
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: { book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subs$.add(
          this.bookService.updateBook(book.id!, result).subscribe(() => {
            this.loadBooks();
          })
        );
      }
    });
  }

  openBookDetailsDialog(book: Book): void {
    this.dialog.open(BookDetailsModalComponent, {
      width: '600px',
      data: { book },
    });
  }

  openReservationConfirmDialog(book: Book): void {
    const dialogRef = this.dialog.open(ReservationConfirmModalComponent, {
      width: '600px',
      data: { book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subs$.add(
          this.reservationService.reserveBook(book.id!).subscribe({
            error: (error) => {
              this.toastr.error(error.error);
            },
            complete: () => {
              this.toastr.success('Reservation successful');
              this.loadReservations();
            },
          })
        );
      }
    });
  }

  cancelReservation(bookId: string): void {
    const reservation = this.reservations.find((r) => r.book_id === bookId);
    if (reservation) {
      this.subs$.add(
        this.reservationService.cancelReservation(reservation.id).subscribe({
          next: () => {
            this.toastr.success('Reservation cancelled');
            this.loadReservations();
          },
          error: (error) => {
            this.toastr.error(error.error);
          },
        })
      );
    }
  }

  isBookReserved(bookId: string): boolean {
    return this.reservations.some((r) => r.book_id === bookId);
  }

  deleteBook(book: Book): void {
    this.subs$.add(
      this.bookService.deleteBook(book.id!).subscribe(() => {
        this.loadBooks();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
