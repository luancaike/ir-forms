import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ir-input-validator',
  templateUrl: './input-validator.component.html',
  styles: [
    `
      .invalid-input {
        margin-left: 10px;
        font-size: 12px;
        font-weight: 400;
        color: red;
      }
    `,
  ],
})
export class InputValidatorComponent {
  @Input() formChild: AbstractControl;
}
