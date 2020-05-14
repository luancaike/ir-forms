import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IrFormConfig } from '../form/ir-form.model';

@Component({
  selector: 'ir-text-input',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{ options.label || '' }}</label>
        <input
          [class.is-invalid]="
            formRoot.controls[options.key].invalid &&
            (formRoot.controls[options.key].dirty ||
              formRoot.controls[options.key].touched)
          "
          [type]="options.typeInput"
          class="form-control"
          [formControlName]="options.key"
          [id]="options.key"
          [placeholder]="options.placeholder || ''"
          [attr.disabled]="options.disabled ? '' : null"
        />
        <ir-input-validator
          [formChild]="formRoot.controls[options.key]"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrTextInputComponent {
  @Input() formRoot: FormGroup;
  @Input() options: IrFormConfig;
}
