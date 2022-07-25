import { TestBed } from '@angular/core/testing';

import { QuantityDealStateService } from './quantity-deal-state.service';

describe('QuantityDealStateService', () => {
  let service: QuantityDealStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityDealStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
