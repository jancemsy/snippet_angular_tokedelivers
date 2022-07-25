import { TestBed } from '@angular/core/testing';

import { DispensaryService } from './dispensary.service';

describe('DispensaryService', () => {
  let service: DispensaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispensaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
