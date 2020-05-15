import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../components/form/form-field.component';
import { FormComponent } from '../components/form/form.component';
import { IrSelectComponent } from '../components/inputs/select.component';
import { IrTextAreaComponent } from '../components/inputs/text-area.component';
import { IrTextInputComponent } from '../components/inputs/text-input.component';
import { InputValidatorComponent } from '../components/validator/input-validator.component';
import { ConfigWrapperService } from '../services/config-wrapper.service';

@NgModule({
  declarations: [
    IrTextAreaComponent,
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  providers: [ConfigWrapperService, FormBuilder],
  entryComponents: [
    IrTextAreaComponent,
    FormComponent,
    FormFieldComponent,
    InputValidatorComponent,
    IrTextInputComponent,
    IrSelectComponent,
  ],
  exports: [
    IrTextAreaComponent,
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
export class IrFormsModule {}
