import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
})
export class AddBookDialogComponent implements OnInit {
  public newBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publishDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });

  constructor(private bookService: BookService, private router: Router) {}

  addNewBook() {
    const title = this.newBookForm.value.title!;
    const author = this.newBookForm.value.author!;
    const publishDate = this.newBookForm.value.publishDate!;
    const description = this.newBookForm.value.description!;
    const genre = this.newBookForm.value.genre!.toUpperCase();
    const rating = parseInt(this.newBookForm.value.rating!);

    this.bookService
      .addBook({
        title,
        author,
        publishDate,
        description,
        genre,
        rating,
      } as Book)
      .subscribe((book) => {
        window.location.reload();
        console.log(book);
      });
  }

  ngOnInit(): void {}
}
