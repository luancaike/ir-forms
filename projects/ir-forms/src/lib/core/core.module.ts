import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../components/form/form-field.component';
import { FormComponent } from '../components/form/form.component';
import { IrRowComponent } from '../components/inputs/row.component';
import { IrSelectComponent } from '../components/inputs/select.component';
import { IrTextAreaComponent } from '../components/inputs/text-area.component';
import { IrTextInputComponent } from '../components/inputs/text-input.component';
import { InputValidatorComponent } from '../components/validator/input-validator.component';

const ImportAndExport = [
  IrRowComponent,
  IrTextAreaComponent,
  FormComponent,
  FormFieldComponent,
  InputValidatorComponent,
  IrTextInputComponent,
  IrSelectComponent,
];

@NgModule({
  declarations: [...ImportAndExport],
  providers: [FormBuilder],
  entryComponents: [...ImportAndExport],
  exports: [FormsModule, CommonModule, ReactiveFormsModule, ...ImportAndExport],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class IrFormsModule {}
