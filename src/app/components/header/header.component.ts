import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { faPlus, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faSignOut = faSignOutAlt;
  faPlus = faPlus;
  screenWidth = window.innerWidth;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event.target'])
  private onResize(window: Window): void {
    this.screenWidth = window.innerWidth;
  }
}
