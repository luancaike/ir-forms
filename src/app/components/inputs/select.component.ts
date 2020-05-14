import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-text-input',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{ options.label || '' }}</label>
        <select
          [class.is-invalid]="
            formRoot.controls[options.key].invalid &&
            (formRoot.controls[options.key].dirty ||
              formRoot.controls[options.key].touched)
          "
          class="form-control"
          [formControlName]="options.key"
          [id]="options.key"
          [attr.disabled]="options.disabled ? '' : null"
        >
          <option *ngFor="let item of optionsData" [ngValue]="item">
            {{ item[options.selectOptions.keyName || 'name'] }}
          </option>
        </select>
        <ir-input-validator
          [formChild]="formRoot.controls[options.key]"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrSelectComponent extends IrBaseComponents
  implements OnChanges, OnInit {
  optionsData = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      console.log(this.options);
      this.UpdateOptionsData();
    }
  }
  ngOnInit(): void {
    console.log(this.formRoot);
    this.UpdateOptionsData();
    this.ObserverValue();
  }
  UpdateOptionsData(): void {
    if (
      this.options.selectOptions &&
      Array.isArray(this.options.selectOptions.data)
    ) {
      this.optionsData = this.options.selectOptions.data;
    }
  }
}
