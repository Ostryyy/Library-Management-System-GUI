import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviewsByBook(bookId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${bookId}`);
  }

  addReview(bookId: string, rating: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${bookId}`, { rating, comment });
  }
}
