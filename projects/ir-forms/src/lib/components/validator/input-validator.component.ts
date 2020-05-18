import { Component, Input, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'ir-input-validator',
  template: `
    <div *ngIf="ShowValidator()">
      <div class="invalid-input" *ngIf="formChild.hasError('required')">
        Campo Obrigatorio
      </div>
      <div class="invalid-input" *ngIf="formChild.hasError('maxlength')">
        Tamanho Maximo {{ formChild.errors.maxlength.requiredLength }}
      </div>
      <div class="invalid-input" *ngIf="formChild.hasError('minlength')">
        Tamanho Minimo {{ formChild.errors.minlength.requiredLength }}
      </div>
    </div>
  `,
  styles: [
    `
      div.invalid-input {
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

  constructor(public viewContainerRef: ViewContainerRef) {}

  ShowValidator(): boolean {
    return !!(
      this.formChild &&
      this.formChild.invalid &&
      this.formChild.errors &&
      (this.formChild.dirty || this.formChild.touched)
    );
  }
}
