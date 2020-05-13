import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputValidatorComponent } from './components/validator/input-validator.component';
import { TextInputComponent } from './components/inputs/text-input.component';

@NgModule({
  declarations: [AppComponent, InputValidatorComponent, TextInputComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  entryComponents: [InputValidatorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
