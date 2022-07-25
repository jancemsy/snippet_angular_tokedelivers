import { TestBed } from '@angular/core/testing';

import { LoyaltySettingsStateService } from './loyalty-settings-state.service';

describe('LoyaltySettingsStateService', () => {
  let service: LoyaltySettingsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyaltySettingsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
