import { TestBed } from '@angular/core/testing';

import { EditDiscountPromoStateService } from './edit-discount-promo-state.service';

describe('EditDiscountPromoStateService', () => {
  let service: EditDiscountPromoStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditDiscountPromoStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
