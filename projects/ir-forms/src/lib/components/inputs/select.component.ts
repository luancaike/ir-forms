import { Component, OnInit } from '@angular/core';
import { IrBaseComponents } from './components.base';

@Component({
  selector: 'ir-select-input',
  template: `
    <ng-template [ngIf]="formRoot">
      <div class="form-group" [formGroup]="formRoot">
        <label [for]="options.key">{{
          options.fieldOptions.label || ''
        }}</label>
        <select
          [class.is-invalid]="
            formRoot.get(options.key).invalid &&
            (formRoot.get(options.key).dirty ||
              formRoot.get(options.key).touched)
          "
          class="form-control form-control-lg"
          [formControlName]="options.key"
          [id]="options.key"
          [attr.disabled]="options.fieldOptions.disabled ? '' : null"
        >
          <option value="" disabled selected>Selecione uma Opção</option>
          <option
            *ngFor="let item of optionsData"
            [ngValue]="
              options.selectOptions.keyValue
                ? item[options.selectOptions.keyValue]
                : item['id']
                ? item['id']
                : item
            "
          >
            {{ item[options.selectOptions.keyText || 'text'] }}
          </option>
        </select>
        <ir-input-validator
          [formChild]="formRoot.get(options.key)"
        ></ir-input-validator>
      </div>
    </ng-template>
  `,
  styles: [],
})
export class IrSelectComponent extends IrBaseComponents implements OnInit {
  get optionsData(): any[] {
    return this.options.selectOptions.data || [];
  }

  ngOnInit(): void {
    this.ObserverValue();
  }
}
