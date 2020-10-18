import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { createEmailControl, createPasswordControl, createLogInControl } from './utils';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit {
  title: 'Регистрация' | 'Авторизация' = 'Авторизация';
  logInForm: FormGroup;
  registrationForm: FormGroup;
  @ViewChild('track') private _track: ElementRef<HTMLElement>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      login: createLogInControl(),
      password: createPasswordControl(),
    });
    this.registrationForm = new FormGroup({
      email: createEmailControl(),
      password: createPasswordControl(),
      login: createLogInControl(),
    });
  }

  openRegistration(): void {
    this.title = 'Регистрация';
    this._track.nativeElement.style.transform = 'translateX(-100%)';
  }

  closeRegistration(): void {
    this.title = 'Авторизация';
    setTimeout(() => (this._track.nativeElement.style.transform = 'translateX(0)'), 300);
  }

  closeAuthPanel(): void {
    this.authService.openAuthPanel = false;
    this.closeRegistration();
    this.logInForm.reset();
    this.registrationForm.reset();
  }

  clearErrors(): void {
    console.log('1');
  }

  async submitLogin(): Promise<void> {
    try {
      const { login, password } = this.logInForm.value;
      await this.authService.login(login, password);
      this.closeAuthPanel();
    } catch (error) {
      this.setErrors(this.logInForm.controls);
    }
  }

  async submitRegistration(): Promise<void> {
    try {
      await this.authService.registration(this.registrationForm.value);
      this.closeAuthPanel();
    } catch (error) {
      console.log(error);
      this.setErrors(this.registrationForm.controls);
    }
  }

  @HostListener('window:scroll')
  private onScroll(): void {
    if (window.scrollY > 0 && window.innerWidth > 575) {
      this.authService.openAuthPanel = false;
    }
  }

  private setErrors(controls: { [key: string]: AbstractControl }): void {
    for (const key in controls) {
      controls[key].setErrors({
        invalidField: true,
      });
    }
  }
}
