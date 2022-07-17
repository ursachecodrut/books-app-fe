import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly bookUrl = 'http://localhost:3000/book';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookUrl}`).pipe(
      map((books) => {
        return books;
      })
    );
  }

  deleteBook(bookId: string): Observable<Book> {
    return this.http.delete<Book>(`${this.bookUrl}`, { body: { bookId } }).pipe(
      map((book) => {
        return book;
      })
    );
  }
}
