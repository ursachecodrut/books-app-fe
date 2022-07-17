import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { BookService } from 'src/app/service/book.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';

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
    private bookService: BookService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddBookDialogComponent, {
      width: '400px',
      height: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialog2(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(EditBookDialogComponent, {
      width: '400px',
      height: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteBook(bookId: string, index: number) {
    this.bookService.deleteBook(bookId).subscribe((book) => {
      this.books.splice(index);
      console.log(book);
    });
  }
}
