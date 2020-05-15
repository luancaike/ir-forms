import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
      <div class="row">
        <ng-container *ngFor="let field of _fields">
          <div [classList]="field.colClasslist || ['col-12']">
            <ir-form-field [options]="field" [form]="form"></ir-form-field>
          </div>
        </ng-container>
      </div>
    </form>
  `,
  styles: [],
  providers: [FormBuilder],
})
export class FormComponent implements AfterViewInit, OnChanges {
  @Input()
  form: FormGroup;

  @Input() fields: IrFormConfig[] = [];

  _fields: IrFormConfig[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.fields) {
    }
  }

  ngAfterViewInit(): void {
    this.MountForm();
  }

  MountForm(): void {
    this.form = this.form || new FormGroup({});
    this.fields.forEach((field) => {
      this.form.addControl(
        field.key,
        this.fb.control('', this.GetValidatorns(field))
      );
    });
    this._fields = this.fields;
    this.form.valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe((rsp) => console.log(rsp));
  }

  GetValidatorns(fields: IrFormConfig): ValidatorFn[] {
    const validators = [];
    if (fields.required) {
      validators.push(Validators.required);
    }
    if (fields.maxLengh >= 0) {
      validators.push(Validators.maxLength(fields.maxLengh));
    }
    if (fields.minLengh >= 0) {
      validators.push(Validators.minLength(fields.minLengh));
    }
    if (fields.max >= 0) {
      validators.push(Validators.max(fields.max));
    }
    if (fields.min >= 0) {
      validators.push(Validators.min(fields.min));
    }
    return validators;
  }

  GetModel(): void {
    console.log(this.form.getRawValue());
  }
}
