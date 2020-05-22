import { Component } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-text-input',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{
          options.fieldOptions.label || ''
        }}</label>
        <input
          [class.is-invalid]="CheckIsInvalid()"
          [type]="options.fieldOptions.typeInput || 'text'"
          class="form-control"
          [formControlName]="options.key"
          [id]="options.key"
          [placeholder]="options.fieldOptions.placeholder || ''"
          [attr.disabled]="options.fieldOptions.disabled ? '' : null"
        />
        <ir-input-validator
          [formChild]="formRoot.get(options.key)"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrTextInputComponent extends IrBaseComponents {}
