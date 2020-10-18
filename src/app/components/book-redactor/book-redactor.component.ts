import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { BooksService } from 'src/app/services/books.service';

import { IBook, IUpdatedBookField } from '../../services/interfaces';
import { createFormControl } from './utils';

type DataForSubmit = IBook | { bookId: string; dataForUpdate: IUpdatedBookField };

@Component({
  selector: 'app-book-redactor',
  templateUrl: './book-redactor.component.html',
  styleUrls: ['./book-redactor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BookRedactorComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  formIsInvalid: boolean;
  bookForm: FormGroup;
  @Input() type: 'create' | 'edit';
  @Input() funcForSubmit: (dataForUpdate: DataForSubmit) => Promise<void>;

  constructor(
    private _authService: AuthService,
    private _roter: Router,
    private _booksServise: BooksService,
    public bookService: BookService
  ) {}

  ngOnInit(): void {
    const defaultValidator = this.type === 'create' ? Validators.required : Validators.nullValidator;
    this.formIsInvalid = this.type === 'edit' ? true : false;
    this.bookForm = new FormGroup({
      title: createFormControl(defaultValidator),
      publishingYear: createFormControl(defaultValidator),
      ISBN: createFormControl(
        defaultValidator,
        Validators.pattern(/(978|979)[ |-][0-9]{1,5}[ |-][0-9]{1,7}[ |-][0-9]{1,7}[0-9]{1}/)
      ),
      author: createFormControl(defaultValidator),
    });
  }

  async submit(): Promise<void> {
    try {
      let dataForSubmit: DataForSubmit;
      const formValue = this.bookForm.value,
        alertMsg =
          this.type === 'create'
            ? ` ${this.bookForm.value.title} успешно создана`
            : `${this.bookService.book.title} успешно обновлена`;

      for (const key in formValue) {
        if (!formValue[key]) {
          delete formValue[key];
        }
      }

      if (this.type === 'create') {
        dataForSubmit = { ...this.bookForm.value, creator: this._authService.user.login };
      } else {
        dataForSubmit = { bookId: this.bookService.book.id, dataForUpdate: this.bookForm.value };
      }

      await this.funcForSubmit(dataForSubmit);
      this._booksServise.getAllBooks();
      this._roter.navigate(['/']);
      alert(`Книга ${alertMsg}`);
    } catch (error) {
      alert(`Ошибка ${error} попробуте перезагурзить страницу`);
    }
  }

  async removeBook(): Promise<void> {
    try {
      await this.bookService.removeBook(this.bookService.book.id);
      alert('Книга успешно удалена!');
      this._booksServise.getAllBooks();
      this._roter.navigate(['/']);
    } catch (error) {
      alert(`Ошибка ${error} попробуте перезагурзить страницу`);
    }
  }
}
