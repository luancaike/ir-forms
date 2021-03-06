import { Component } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-text-area',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{
          options.fieldOptions.label || ''
        }}</label>
        <textarea
          [class.is-invalid]="checkIsInvalid()"
          [rows]="options.fieldOptions.rows || 5"
          class="form-control"
          [formControlName]="options.key || null"
          [id]="options.key"
          [placeholder]="options.fieldOptions.placeholder || ''"
          [attr.disabled]="options.fieldOptions.disabled ? '' : null"
        ></textarea>
        <ir-input-validator
          [formChild]="formRoot.get(options.key)"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrTextAreaComponent extends IrBaseComponents {}
