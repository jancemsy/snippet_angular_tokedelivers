import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';

xdescribe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
