import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-forms',
  template: `
    <form *ngIf="this.form" [formGroup]="form">
      <ng-container *ngFor="let field of _fields">
        <div [classList]="field.colClasslist || ['col-12']">
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
  form: FormGroup;

  @Input() fields: IrFormConfig[] = [];

  _fields: IrFormConfig[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields) {
      console.log('changes', changes);
      this.MountForm();
    }
  }

  MountForm(): void {
    this.form = this.form || new FormGroup({});
    this.FieldsToFormControls(this.fields);
    this._fields = this.fields.filter((el) => el.component !== undefined);
    this.form.valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe((rsp) => console.log(rsp));
  }

  FieldsToFormControls(fields: IrFormConfig[]) {
    fields.forEach((field) => {
      if (field.key && !this.form.controls[field.key]) {
        this.form.addControl(
          field.key,
          this.fb.control('', this.GetValidatorns(field))
        );
      }
      if (field.children) {
        this.FieldsToFormControls(field.children);
      }
    });
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
