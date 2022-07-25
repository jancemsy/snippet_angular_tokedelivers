import { TestBed } from '@angular/core/testing';

import { DiscountPromoService } from './discount-promo.service';

describe('DiscountPromoService', () => {
  let service: DiscountPromoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountPromoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
