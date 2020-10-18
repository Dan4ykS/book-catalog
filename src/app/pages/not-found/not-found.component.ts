import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { setPageTitle } from '../utils';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
  constructor(title: Title) {
    setPageTitle(title, '404');
  }

  ngOnInit(): void {}
}
