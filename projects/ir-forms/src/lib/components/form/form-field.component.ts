import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defineHiddenProp, observeDeep } from '../../core/utils';
import { IrComponents } from '../inputs/components.base';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-form-field',
  template: ` <ng-template #container></ng-template>`,
  styles: [],
})
export class FormFieldComponent implements OnChanges, OnInit, OnDestroy {
  @Input() options: IrFormConfig;
  @Input() form: FormGroup;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  observers: Function[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.setObserverOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options || changes.form) {
      this.mountInput();
      if (!changes.options.firstChange) {
        this.setObserverOptions();
      }
    }
  }

  mountFormInput(field: IrFormConfig) {
    if (field.key) {
      const modelValue = this.form.getRawValue();
      const fieldValue = modelValue[field.key];
      this.form.removeControl(field.key);
      this.form.addControl(
        field.key,
        this.fb.control(
          field.value || fieldValue || '',
          this.getValidatorns(field)
        )
      );
    }
    if (Array.isArray(field.children)) {
      field.children.forEach((item) => this.mountFormInput(item));
    }
  }

  getValidatorns(fields: IrFormConfig): ValidatorFn[] {
    const validators = [];
    const fieldOptions = fields.fieldOptions;
    if (fields.fieldOptions) {
      if (fieldOptions.required) {
        validators.push(Validators.required);
      }
      if (fieldOptions.maxLengh >= 0) {
        validators.push(Validators.maxLength(fieldOptions.maxLengh));
      }
      if (fieldOptions.minLengh >= 0) {
        validators.push(Validators.minLength(fieldOptions.minLengh));
      }
      if (fieldOptions.max >= 0) {
        validators.push(Validators.max(fieldOptions.max));
      }
      if (fieldOptions.min >= 0) {
        validators.push(Validators.min(fieldOptions.min));
      }
    }
    return validators;
  }

  setObserverOptions() {
    const observerModel = observeDeep({
      source: this,
      target: this.options,
      paths: ['options'],
      setFn: () => {
        this.options.instance.redraw();
      },
    });
    this.observers.push(observerModel);
  }

  mountInput() {
    this.container.clear();
    this.mountFormInput(this.options);
    if (!this.options.component) {
      return;
    }
    this.drawComponent();
  }

  drawComponent() {
    const resolver = this.resolver.resolveComponentFactory(
      this.options.component
    );
    const componentFactory = this.container.createComponent(resolver);
    const component: IrComponents = componentFactory.instance;
    component.deps = {};
    component.options = this.options;
    component.redraw = () => this.mountInput();
    component.formRoot = this.form;
    defineHiddenProp(this.options, 'instance', component);
  }

  ngOnDestroy(): void {
    this.observers.forEach((observer) => observer());
  }
}
