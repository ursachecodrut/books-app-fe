import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private auth: AuthService,
    private route: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(bookId: string, index: number) {
    this.bookService.deleteBook(bookId).subscribe((book) => {
      this.books.splice(index);
      console.log(book);
    });
  }
}
