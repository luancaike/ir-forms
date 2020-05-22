import { AbstractControl } from '@angular/forms';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IrFormConfig } from '../form/form.model';

export interface IrComponents {
  formRoot: FormGroup;
  formControl: AbstractControl;
  options: IrFormConfig;

  Redraw(): void;

  ObserverValue(): void;
}

export abstract class IrBaseComponents implements IrComponents {
  @Input() formRoot: FormGroup;
  @Input() options: IrFormConfig;

  get formControl(): AbstractControl {
    return this.formRoot.controls[this.options.key];
  }

  Redraw(): void {
    // Void
  }

  CheckIsInvalid(): boolean {
    if (!(this.options.key || this.formRoot.controls)) {
      return false;
    }
    const control = this.formRoot.controls[this.options.key];
    return control && control.invalid && (control.dirty || control.touched);
  }

  ObserverValue(): void {
    const control = this.formRoot.controls[this.options.key];
    if (!control) {
      return;
    }
    control.valueChanges
      .pipe(debounce(() => interval(300)))
      .subscribe((rsp) => {
        if (this.options.onChange) {
          this.options.onChange(rsp);
        }
      });
  }
}
