import { TestBed } from '@angular/core/testing';

import { AddLoyaltyStateService } from './add-loyalty-state.service';

describe('AddLoyaltyStateService', () => {
  let service: AddLoyaltyStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddLoyaltyStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
