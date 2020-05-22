import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  _fields: IrFormConfig[] = [];

  @Input()
  form: FormGroup;

  @Input()
  get fields(): IrFormConfig[] {
    return this._fields || [];
  }

  set fields(value: IrFormConfig[]) {
    this._fields = value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields) {
      this.MountForm();
    }
  }

  MountForm(): void {
    this.form = this.form || new FormGroup({});
    this.FieldsToFormControls(this.fields);
  }

  FieldsToFormControls(fields: IrFormConfig[]): void {
    fields.forEach((field) => {
      if (field.key && !this.form.controls[field.key]) {
        this.form.addControl(
          field.key,
          this.fb.control(field.value || '', this.GetValidatorns(field))
        );
      }
      if (field.children) {
        this.FieldsToFormControls(field.children);
      }
    });
  }

  public getFieldByKey(key: string): IrFormConfig | null {
    let fieldFind = null;
    const selectByKey = (field: IrFormConfig[]): IrFormConfig | null =>
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

  public getFormControlByKey(key: string): AbstractControl {
    return this.form.get(key);
  }

  GetValidatorns(fields: IrFormConfig): ValidatorFn[] {
    const validators = [];
    if (fields.fieldOptions) {
      if (fields.fieldOptions.required) {
        validators.push(Validators.required);
      }
      if (fields.fieldOptions.maxLengh >= 0) {
        validators.push(Validators.maxLength(fields.fieldOptions.maxLengh));
      }
      if (fields.fieldOptions.minLengh >= 0) {
        validators.push(Validators.minLength(fields.fieldOptions.minLengh));
      }
      if (fields.fieldOptions.max >= 0) {
        validators.push(Validators.max(fields.fieldOptions.max));
      }
      if (fields.fieldOptions.min >= 0) {
        validators.push(Validators.min(fields.fieldOptions.min));
      }
    }
    return validators;
  }
}
