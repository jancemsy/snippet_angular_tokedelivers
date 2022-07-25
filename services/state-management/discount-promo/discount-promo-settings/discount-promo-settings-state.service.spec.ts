import { TestBed } from '@angular/core/testing';

import { DiscountPromoSettingsStateService } from './discount-promo-settings-state.service';

describe('DiscountPromoSettingsStateService', () => {
  let service: DiscountPromoSettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountPromoSettingsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
