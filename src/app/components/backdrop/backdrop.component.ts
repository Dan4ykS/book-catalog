import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BackdropComponent {
  @Input() conditionForOpen: boolean;
  @Output() onClose = new EventEmitter<() => void>();

  constructor() {}
}
