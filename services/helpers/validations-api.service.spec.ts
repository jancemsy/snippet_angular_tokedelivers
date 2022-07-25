import { TestBed } from '@angular/core/testing';

import { ValidationsApiService } from './validations-api.service';

describe('ValidationsApiService', () => {
  let service: ValidationsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
