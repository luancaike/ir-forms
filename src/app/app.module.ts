import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { InputValidatorComponent } from './components/validator/input-validator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { TextInputComponent } from './components/inputs/text-input.component';
import { UserServiceConfig } from '../services/config-wrapper.service';

export const wrapper: UserServiceConfig = {
  wrapper: [{ key: 'text-input', component: TextInputComponent }],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule.forRoot(wrapper),
    FontAwesomeModule,
    MultiselectDropdownModule,
    BrowserModule,
    FontAwesomeModule,
  ],
  entryComponents: [InputValidatorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
