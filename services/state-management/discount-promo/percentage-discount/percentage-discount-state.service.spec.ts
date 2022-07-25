import { TestBed } from '@angular/core/testing';

import { PercentageDiscountStateService } from './percentage-discount-state.service';

describe('PercentageDiscountStateService', () => {
  let service: PercentageDiscountStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PercentageDiscountStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
