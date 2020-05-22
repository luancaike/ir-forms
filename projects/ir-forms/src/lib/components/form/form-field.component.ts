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
import { defineHiddenProp } from '../../core/utils';
import { IrComponents } from '../inputs/components.base';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-form-field',
  template: ` <ng-template #container></ng-template>`,
  styles: [],
})
export class FormFieldComponent implements OnChanges {
  @Input() options: IrFormConfig;
  @Input() form: FormGroup;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options || changes.form) {
      this.MountInput();
    }
  }

  MountInput(): void {
    this.container.clear();
    if (!this.options.component) {
      return;
    }

    const resolver = this.resolver.resolveComponentFactory(
      this.options.component
    );
    const componentFactory = this.container.createComponent(resolver);
    const component: IrComponents = componentFactory.instance;

    component.options = this.options;
    component.Redraw = (): void => this.MountInput();
    component.formRoot = this.form;
    defineHiddenProp(this.options, 'instance', component);
  }
}
