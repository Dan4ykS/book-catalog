import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faCopyright, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  siteTitile = environment.siteName;
  faCopyright = faCopyright;

  constructor() {}

  ngOnInit(): void {}
}
