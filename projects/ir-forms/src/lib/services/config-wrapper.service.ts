import { Injectable, Optional } from '@angular/core';
import { IrTextInputComponent } from '../components';
import { IrSelectComponent } from '../components';

export class UserServiceConfig {
  wrapper: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigWrapperService {
  public wrapper = [
    { key: 'text-input', component: IrTextInputComponent },
    { key: 'select', component: IrSelectComponent },
  ];
  constructor(@Optional() config?: UserServiceConfig) {
    if (config) {
      this.wrapper = config.wrapper;
    }
  }
}
