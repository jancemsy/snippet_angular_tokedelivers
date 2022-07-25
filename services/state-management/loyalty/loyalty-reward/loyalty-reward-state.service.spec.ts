import { TestBed } from '@angular/core/testing';

import { LoyaltyRewardStateService } from './loyalty-reward-state.service';

describe('LoyaltyRewardStateService', () => {
  let service: LoyaltyRewardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyaltyRewardStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
