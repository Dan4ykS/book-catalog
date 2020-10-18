import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { setPageTitle } from '../utils';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  imgSrc: string;

  constructor(
    public booksService: BooksService,
    public authService: AuthService,
    private _bookServise: BookService,
    title: Title
  ) {
    setPageTitle(title, 'главная');
  }

  ngOnInit(): void {}

  async removeBook(id: string): Promise<void> {
    try {
      await this._bookServise.removeBook(id);
      this.booksService.getAllBooks();
    } catch (error) {
      alert(`Ошибка ${error} попробуйте перезагурзить страницу`);
    }
  }
}
