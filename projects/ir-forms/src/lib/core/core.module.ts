import { ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigWrapperService, UserServiceConfig } from '../services';
import { FormFieldComponent } from '../components';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputValidatorComponent } from '../components';
import { IrTextInputComponent } from '../components';
import { IrSelectComponent } from '../components';
import { FormComponent } from '../components';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ConfigWrapperService],
  entryComponents: [IrTextInputComponent, IrSelectComponent],
  exports: [FormComponent, FormFieldComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class IrFormsModule {
  static forRoot(): ModuleWithProviders<IrFormsModule> {
    return {
      ngModule: IrFormsModule,
      providers: [ConfigWrapperService, FormBuilder],
    };
  }
  static forChill(
    config?: UserServiceConfig
  ): ModuleWithProviders<IrFormsModule> {
    return {
      ngModule: IrFormsModule,
      providers: [
        { provide: ConfigWrapperService, useValue: config },
        FormBuilder,
      ],
    };
  }
}
