import { TestBed } from '@angular/core/testing';

import { PointsTiersRuleStateService } from './points-tiers-rule-state.service';

describe('PointsTiersRuleStateService', () => {
  let service: PointsTiersRuleStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsTiersRuleStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
