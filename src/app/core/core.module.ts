import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigWrapperService,
  UserServiceConfig,
} from '../../services/config-wrapper.service';
import { IrFormComponent } from '../components/form/ir-form.component';
import { FormFieldComponent } from '../components/form/form-field.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from '../components/validator/input-validator.component';
import { IrTextInputComponent } from '../components/inputs/text-input.component';
import { IrSelectComponent } from '../components/inputs/select.component';

@NgModule({
  declarations: [
    IrFormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  providers: [ConfigWrapperService],
  entryComponents: [IrTextInputComponent, IrSelectComponent],
  exports: [IrFormComponent, FormFieldComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only'
      );
    }
  }
  static forRoot(config?: UserServiceConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: ConfigWrapperService, useValue: config },
        FormBuilder,
      ],
    };
  }
}
