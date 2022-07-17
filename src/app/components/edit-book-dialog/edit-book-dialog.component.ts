import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.scss'],
})
export class EditBookDialogComponent implements OnInit {
  public editBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publishDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });

  constructor(private bookService: BookService) {}

  editBook() {
    const title = this.editBookForm.value.title!;
    const author = this.editBookForm.value.author!;
    const publishDate = this.editBookForm.value.publishDate!;
    const description = this.editBookForm.value.description!;
    const genre = this.editBookForm.value.genre!.toUpperCase();
    const rating = parseInt(this.editBookForm.value.rating!);

    this.bookService
      .editBook({
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
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}
