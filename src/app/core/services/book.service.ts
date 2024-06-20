import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}`, book);
  }

  updateBook(bookId: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${bookId}`, book);
  }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${bookId}`);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }
}
