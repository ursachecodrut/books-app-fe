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

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.bookUrl}`, { ...book }).pipe(
      map((book) => {
        return book;
      })
    );
  }

  editBook(book: Book): Observable<Book> {
    return this.http
      .put<Book>(`${this.bookUrl}`, { bookId: book.id, ...book })
      .pipe(
        map((book) => {
          return book;
        })
      );
  }
}
