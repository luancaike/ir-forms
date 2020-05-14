import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ConfigWrapperService } from '../../services';
import { FormGroup } from '@angular/forms';
import { IrFormConfig } from './form.model';

@Component({
  selector: 'ir-form-field',
  template: `<ng-template #container></ng-template>`,
  styles: [],
})
export class FormFieldComponent implements OnInit {
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

  ngOnInit(): void {
    const factory = this.configForms.wrapper.find(
      (el) => el.key === this.options.type
    );
    const resolver = this.resolver.resolveComponentFactory(factory.component);

    const componentFactory = this.container.createComponent(resolver);
    const component: any = componentFactory.instance;
    component.options = this.options;
    component.formRoot = this.form;
  }
}
