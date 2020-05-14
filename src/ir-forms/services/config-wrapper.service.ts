import { Injectable, Optional } from '@angular/core';

export class UserServiceConfig {
  wrapper: any[];
}

@Injectable({
  providedIn: 'root',
})
export class ConfigWrapperService {
  public wrapper = [];

  constructor(@Optional() config?: UserServiceConfig) {
    if (config) {
      this.wrapper = config.wrapper;
    }
  }
}
