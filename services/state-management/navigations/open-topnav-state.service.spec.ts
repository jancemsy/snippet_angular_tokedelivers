import { TestBed } from '@angular/core/testing';

import { OpenTopnavStateService } from './open-topnav-state.service';

describe('OpenTopnavStateService', () => {
  let service: OpenTopnavStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTopnavStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
