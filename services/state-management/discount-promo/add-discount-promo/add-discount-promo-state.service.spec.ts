import { TestBed } from '@angular/core/testing';

import { AddDiscountPromoStateService } from './add-discount-promo-state.service';

describe('AddDiscountPromoStateService', () => {
  let service: AddDiscountPromoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDiscountPromoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
