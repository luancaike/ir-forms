import { Component } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-text-area',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{ options.label || '' }}</label>
        <textarea
          [class.is-invalid]="
            formRoot.controls[options.key].invalid &&
            (formRoot.controls[options.key].dirty ||
              formRoot.controls[options.key].touched)
          "
          [rows]="options.rows || 3"
          class="form-control"
          [formControlName]="options.key"
          [id]="options.key"
          [placeholder]="options.placeholder || ''"
          [attr.disabled]="options.disabled ? '' : null"
        ></textarea>
        <ir-input-validator
          [formChild]="formRoot.controls[options.key]"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrTextAreaComponent extends IrBaseComponents {}
