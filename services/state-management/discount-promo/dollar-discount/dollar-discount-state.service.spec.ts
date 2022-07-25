import { TestBed } from '@angular/core/testing';

import { DollarDiscountStateService } from './dollar-discount-state.service';

describe('DollarDiscountStateService', () => {
  let service: DollarDiscountStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DollarDiscountStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
