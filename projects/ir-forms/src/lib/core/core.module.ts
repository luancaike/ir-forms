import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigWrapperService } from '../services/config-wrapper.service';
import { FormFieldComponent } from '../components/form/form-field.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputValidatorComponent } from '../components/validator/input-validator.component';
import { IrTextInputComponent } from '../components/inputs/text-input.component';
import { IrSelectComponent } from '../components/inputs/select.component';
import { FormComponent } from '../components/form/form.component';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ConfigWrapperService, FormBuilder],
  entryComponents: [
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class IrFormsModule {
  // static forRoot(): ModuleWithProviders<IrFormsModule> {
  //   return {
  //     ngModule: IrFormsModule,
  //     providers: [ConfigWrapperService, FormBuilder],
  //   };
  // }
  // static forChill(
  //   config?: UserServiceConfig
  // ): ModuleWithProviders<IrFormsModule> {
  //   return {
  //     ngModule: IrFormsModule,
  //     providers: [
  //       { provide: ConfigWrapperService, useValue: config },
  //       FormBuilder,
  //     ],
  //   };
  // }
}
