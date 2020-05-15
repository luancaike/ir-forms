import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IrFormConfig } from '../form/form.model';

export interface IrComponents {
  ObserverValue(): void;
}

export abstract class IrBaseComponents implements IrComponents {
  @Input() formRoot: FormGroup;
  @Input() options: IrFormConfig;
  ObserverValue(): void {
    const control = this.formRoot.controls[this.options.key];
    control.valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe((rsp) => {
        if (this.options.onChange) {
          this.options.onChange(rsp);
        }
      });
  }
}
