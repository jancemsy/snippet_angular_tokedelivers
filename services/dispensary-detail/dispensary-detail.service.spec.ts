import { TestBed } from '@angular/core/testing';

import { DispensaryDetailService } from './dispensary-detail.service';

describe('DispensaryDetailService', () => {
  let service: DispensaryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispensaryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
