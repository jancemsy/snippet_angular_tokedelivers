import { TestBed } from '@angular/core/testing';

import { TopNavStateService } from './top-nav-state.service';

describe('TopNavStateService', () => {
  let service: TopNavStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopNavStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
