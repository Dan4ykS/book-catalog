import { Injectable } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { FirebaseService } from './firebase.service';

import { IUser } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: IUser;
  private _openAuthPanel = false;
  private _isAuth = false;

  constructor(private _firebaseService: FirebaseService) {}

  get user(): IUser {
    return this._user;
  }

  get isAuth(): boolean {
    return this._isAuth;
  }

  get openAuthPanel(): boolean {
    return this._openAuthPanel;
  }

  set openAuthPanel(newState: boolean) {
    this._openAuthPanel = newState;
  }

  toggleAuthPenel(): void {
    this._openAuthPanel = !this._openAuthPanel;
  }

  login = async (login: string, password: string): Promise<void> => {
    const user = await this._firebaseService.auth(login, password);
    this.auth(user);
  };

  registration = async (newUserData: IUser): Promise<void> => {
    const newUser = await this._firebaseService.createUser(newUserData);
    this.auth(newUser);
  };

  logOut(): void {
    console.log('Нажатие');

    this._user = {
      login: '',
      password: '',
      email: '',
    };
    this._isAuth = false;
    localStorage.removeItem('userData');
  }

  chekAuth(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this._isAuth = true;
      this._user = JSON.parse(userData);
    }
  }

  private auth(user: IUser): void {
    this._isAuth = true;
    this._user = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
