import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { IBook } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _loading = true;
  private _books: IBook[] = [];

  constructor(private _firebaseService: FirebaseService) {}

  get books(): IBook[] {
    return this._books;
  }

  get loading(): boolean {
    return this._loading;
  }

  getAllBooks = (): void => {
    this._firebaseService.fetchAllBooks().subscribe((books) => {
      this._loading = false;
      this._books = books;
    });
  };
}
