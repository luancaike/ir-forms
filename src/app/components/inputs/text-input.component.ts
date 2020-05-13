import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ir-text-input',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="inputKey">{{ label }}</label>
        <input
          [class.is-invalid]="
            formRoot.controls[inputKey].invalid &&
            (formRoot.controls[inputKey].dirty ||
              formRoot.controls[inputKey].touched)
          "
          class="form-control"
          [formControlName]="inputKey"
          [id]="inputKey"
          [placeholder]="placeholder"
        />
        <ir-input-validator
          [formChild]="formRoot.controls[inputKey]"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class TextInputComponent {
  @Input() label: string;
  @Input() inputKey: string;
  @Input() placeholder: string;
  @Input() formRoot: FormGroup;
}
