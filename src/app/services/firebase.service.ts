import * as bcrypt from 'bcryptjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { mapData, findUsers } from './utils';
import { IBook, IUpdatedBookField, IUser } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _connectionToBooks$: AngularFirestoreCollection<IBook>;
  private _connectionToUsers$: AngularFirestoreCollection<IUser>;

  constructor(_firestore: AngularFirestore, private _storage: AngularFireStorage) {
    this._connectionToBooks$ = _firestore.collection<IBook>('books');
    this._connectionToUsers$ = _firestore.collection<IUser>('users');
  }

  fetchAllBooks(): Observable<IBook[]> {
    return this._connectionToBooks$.snapshotChanges().pipe(
      map((resp) => mapData(resp) as IBook[]),
      catchError((error) => throwError(error))
    );
  }

  fetchBook(id: string): Observable<IBook> {
    return this._connectionToBooks$
      .doc(id)
      .get()
      .pipe(
        map((resp) => mapData(resp as DocumentSnapshot<IBook>) as IBook),
        catchError((error) => throwError(error))
      );
  }

  async createBook(newBook: IBook): Promise<void> {
    await this._connectionToBooks$.add(newBook);
  }

  async updateBook(bookId: string, newData: IUpdatedBookField): Promise<void> {
    console.log(bookId, newData);
    await this._connectionToBooks$.doc(bookId).update(newData);
  }

  async removeBook(bokId: string): Promise<void> {
    await this._connectionToBooks$.doc(bokId).delete();
  }

  async uploadImg(file: File, bookId: string): Promise<void> {
    const data = await this._storage.upload(file.name, file),
      imgSrc = await data.ref.getDownloadURL();

    await this._connectionToBooks$.doc(bookId).update({ imgSrc });
  }

  async auth(login: string, password: string): Promise<IUser> {
    const user = (await findUsers(this._connectionToUsers$, login))[0],
      passwordIsValid = await bcrypt.compare(password, user.password);

    if (user && passwordIsValid && user.login === login) {
      return user;
    }
    throw new Error('Невалидные данные!');
  }

  async createUser(userData: IUser): Promise<IUser> {
    const { login } = userData,
      users = await findUsers(this._connectionToUsers$, login);

    if (!users.length) {
      const newUserData: IUser = {
          ...userData,
          password: await bcrypt.hash(userData.password, 5),
        },
        newUser = await (await this._connectionToUsers$.add(newUserData)).get();

      return { id: newUser.id, ...newUser.data() } as IUser;
    } else {
      throw new Error('Такой пользователь уже существует !');
    }
  }
}
