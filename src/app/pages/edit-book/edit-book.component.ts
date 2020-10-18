import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { BookService } from '../../services/book.service';
import { setPageTitle } from '../utils';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent implements OnInit {
  constructor(public bookService: BookService, private _route: ActivatedRoute, title: Title) {
    setPageTitle(title, 'редактирование книги');
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.bookService.getBook(params.id);
    });
  }
}
