import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Reservation } from '../../models/reservation';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private baseUrl = `${environment.apiUrl}/reservations`;
  private booksUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getUserReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}`).pipe(
      switchMap((reservations) =>
        forkJoin(
          reservations.map((reservation) =>
            this.http.get<Book>(`${this.booksUrl}/${reservation.book_id}`).pipe(
              map((book) => ({
                ...reservation,
                bookTitle: book.title,
              }))
            )
          )
        )
      )
    );
  }

  getReservationsByBook(bookId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/book/${bookId}`);
  }

  reserveBook(bookId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { bookId });
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reservationId}`);
  }
}
