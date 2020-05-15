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
import { ConfigWrapperService } from '../../services/config-wrapper.service';
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

  constructor(
    private configForms: ConfigWrapperService,
    private resolver: ComponentFactoryResolver
  ) {
    console.log(configForms);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.MountInput();
    }
  }

  ngOnInit(): void {
    this.MountInput();
  }

  MountInput() {
    if (this.renderPremission()) {
      this.container.clear();
      const factory = this.configForms.wrapper.find(
        (el) => el.key === this.options.type
      );
      if (!factory) {
        return;
      }
      const resolver = this.resolver.resolveComponentFactory(factory.component);

      const componentFactory = this.container.createComponent(resolver);
      const component: any = componentFactory.instance;
      component.options = this.options;
      component.formRoot = this.form;
    }
  }

  renderPremission(): boolean {
    return !!this.form.controls[this.options.key];
  }
}
