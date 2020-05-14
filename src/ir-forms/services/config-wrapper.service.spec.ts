import { TestBed } from '@angular/core/testing';

import { ConfigWrapperService } from './config-wrapper.service';

describe('ConfigWrapperService', () => {
  let service: ConfigWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
