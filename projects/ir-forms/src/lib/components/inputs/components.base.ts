import { SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { interval } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { IrFormConfig } from '../form/form.model';

export interface IrComponents {
  formRoot: FormGroup;
  formControl: AbstractControl;
  options: IrFormConfig;
  deps;

  redraw(): void;

  ngOnChanges(changes: SimpleChanges): void;

  observerValue(): void;
}

export abstract class IrBaseComponents implements IrComponents, OnChanges {
  @Input() formRoot: FormGroup;
  @Input() options: IrFormConfig;
  @Input() deps;

  get formControl() {
    return this.formRoot.controls[this.options.key];
  }

  checkIsInvalid(): boolean {
    if (!(this.options.key || this.formRoot.controls)) {
      return false;
    }
    const control = this.formRoot.controls[this.options.key];
    return control && control.invalid && (control.dirty || control.touched);
  }

  getTextSelectOption(item: any) {
    let itemText = item[this.options.selectOptions.keyText || 'text'];
    const itemId = item[this.options.selectOptions.keyId || 'id'];
    const itemAliasses = this.options.selectOptions.aliases || '';
    if (this.options.selectOptions.groupIdText) {
      itemText = `${itemAliasses}${itemId} - ${itemText}`;
    }
    return itemText;
  }

  getDescSelectOption(item: any) {
    return item[this.options.selectOptions.keyDesc || 'desc'];
  }

  observerValue(): void {
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

  ngOnChanges(changes: SimpleChanges): void {}

  redraw(): void {}
}
