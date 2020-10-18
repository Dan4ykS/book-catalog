import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BookService } from 'src/app/services/book.service';

import { setPageTitle } from '../utils';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
})
export class CreateBookComponent implements OnInit {
  constructor(public bookService: BookService, title: Title) {
    setPageTitle(title, 'добавление книги');
  }

  ngOnInit(): void {
    this.bookService.resetBookData();
  }
}
