import { TestBed } from '@angular/core/testing';

import { MainFormStateService } from './main-form-state.service';

describe('MainFormStateService', () => {
  let service: MainFormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainFormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
