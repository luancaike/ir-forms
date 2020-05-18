import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-form-field',
  template: ` <ng-template #container></ng-template>`,
  styles: [],
})
export class FormFieldComponent implements OnInit, OnChanges {
  @Input() options: IrFormConfig;
  @Input() form: FormGroup;
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.MountInput();
    }
  }

  ngOnInit(): void {
    this.MountInput();
  }

  MountInput() {
    this.container.clear();

    const resolver = this.resolver.resolveComponentFactory(
      this.options.component
    );

    const componentFactory = this.container.createComponent(resolver);
    const component: any = componentFactory.instance;
    component.options = this.options;
    component.formRoot = this.form;
  }
}
