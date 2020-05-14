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
import { IrFormConfig } from './ir-form.model';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'ir-form',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
      <div class="row">
        <ng-container *ngFor="let field of config">
          <div [classList]="field.colClasslist || ['col-12']">
            <ir-form-field
              [options]="field"
              [form]="profileForm"
            ></ir-form-field>
          </div>
        </ng-container>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button class="btn btn-outline-dark" (click)="GetModel()">
            Model
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [],
  providers: [FormBuilder],
})
export class IrFormComponent implements AfterViewInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      console.log(changes);
    }
  }
  @Input() config: IrFormConfig[];
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.config = [
      {
        key: 'username',
        type: 'text-input',
        typeInput: 'text',
        required: true,
        label: 'Email',
        colClasslist: ['col-6'],
      },
      {
        key: 'password',
        typeInput: 'password',
        type: 'text-input',
        required: true,
        label: 'Senha',
      },
      {
        key: 'options',
        type: 'select',
        required: true,
        label: 'Email',
        selectOptions: { keyName: 'teste', data: [] },
        onChange: console.log,
        colClasslist: ['col-2'],
      },
    ];
    this.MountForm();
  }

  ngAfterViewInit(): void {
    this.profileForm.valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe((rsp) => console.log(rsp));
  }

  MountForm(): void {
    const formGroup = {};
    this.config.forEach((field) => {
      formGroup[field.key] = [null, this.GetValidatorns(field)];
    });
    this.profileForm = this.fb.group(formGroup);
  }

  GetValidatorns(config: IrFormConfig): ValidatorFn[] {
    const validators = [];
    if (config.required) {
      validators.push(Validators.required);
    }
    if (config.maxLengh >= 0) {
      validators.push(Validators.maxLength(config.maxLengh));
    }
    if (config.minLengh >= 0) {
      validators.push(Validators.minLength(config.minLengh));
    }
    if (config.max >= 0) {
      validators.push(Validators.max(config.max));
    }
    if (config.min >= 0) {
      validators.push(Validators.min(config.min));
    }
    return validators;
  }

  onSubmit(): void {
    this.config[2].selectOptions.data.push({ teste: 'a' });
  }
  GetModel(): void {
    console.log(this.profileForm.getRawValue());
  }
}
