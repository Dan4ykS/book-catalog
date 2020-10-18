import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-invalid-message',
  templateUrl: './invalid-message.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class InvalidMessageComponent {
  @Input() formContol: FormControl;
  @Input() invalidContent: { message: string; error: string }[];
  @Input() messages: string[];
  @Input() conditions: string[];

  constructor() {}
}
