import { Injectable, Optional } from '@angular/core';
import { IrTextAreaComponent } from '../components/inputs/text-area.component';
import { IrSelectComponent } from '../components/inputs/select.component';
import { IrTextInputComponent } from '../components/inputs/text-input.component';

export class UserServiceConfig {
  wrapper: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigWrapperService {
  public wrapper = [
    { key: 'textinput', component: IrTextInputComponent },
    { key: 'textarea', component: IrTextAreaComponent },
    { key: 'select', component: IrSelectComponent },
  ];
  constructor(@Optional() config?: UserServiceConfig) {
    if (config) {
      this.wrapper = config.wrapper;
    }
  }
}
