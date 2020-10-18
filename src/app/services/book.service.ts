import { Injectable } from '@angular/core';

import { FirebaseService } from './firebase.service';
import { IBook, IDataForUpdateBook } from './interfaces';
import { initialBookState } from './utils';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private _loading = true;
  private _book: IBook = initialBookState;

  constructor(private _firebaseService: FirebaseService) {}

  get loading(): boolean {
    return this._loading;
  }

  get book(): IBook {
    return this._book;
  }

  getBook = (id: string): void => {
    this._loading = true;
    this._firebaseService.fetchBook(id).subscribe((book) => {
      this._loading = false;
      this._book = book;
    });
  };

  createBook = async (newBook: IBook): Promise<void> => {
    await this._firebaseService.createBook(newBook);
  };

  removeBook = async (bookId: string): Promise<void> => {
    await this._firebaseService.removeBook(bookId);
  };

  updateBook = async (dataForUpdate: IDataForUpdateBook) => {
    await this._firebaseService.updateBook(dataForUpdate.bookId, dataForUpdate.dataForUpdate);
  };

  resetBookData(): void {
    this._book = initialBookState;
  }
}
