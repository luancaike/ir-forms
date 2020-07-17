import { AbstractControl } from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-forms',
  template: `
    <form *ngIf="this.form" [formGroup]="form">
      <ng-container *ngFor="let field of fields">
        <div
          *ngIf="!field.hidden"
          [classList]="field.colClasslist || ['col-12']"
        >
          <ir-form-field [options]="field" [form]="form"></ir-form-field>
        </div>
      </ng-container>
    </form>
  `,
  styles: [],
  providers: [FormBuilder],
})
export class FormComponent implements OnChanges {
  @Input()
  get fields(): IrFormConfig[] {
    return this._fields || [];
  }

  set fields(value: IrFormConfig[]) {
    this._fields = value;
  }

  @Input() form: FormGroup;
  private _fields: IrFormConfig[];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields) {
      this.mountForm();
    }
  }

  public mountForm(): void {
    this.form = this.form || new FormGroup({});
  }

  public getGridOptionsApi(key: string) {
    const field = this.getFieldByKey(key);
    if (!field.gridOptions) {
      throw new Error('gridOptions: Undefined or False');
    }
    if (!field.gridOptions.api) {
      throw new Error('api: Undefined or False');
    }
    return field.gridOptions.api;
  }

  public getFieldByKey(key: string): IrFormConfig | undefined {
    let fieldFind;
    const selectByKey = (field: IrFormConfig[]) =>
      field.find((fl) => {
        if (fl.key === key) {
          fieldFind = fl;
        }
        if (fl.children) {
          return !!selectByKey(fl.children);
        }
      });
    selectByKey(this.fields);
    return fieldFind;
  }

  public setFieldSelectOptionsData(key: string, data: any[]) {
    const field = this.getFieldByKey(key);
    field.selectOptions.data = data;
  }

  public getFormControlByKey(key: string): AbstractControl {
    return this.form.get(key);
  }

  public setFormFieldValue(key: string, value: any) {
    const formField = this.getFormControlByKey(key);
    formField.setValue(value);
  }
}
