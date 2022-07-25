import { TestBed } from '@angular/core/testing';

import { PosSideService } from './pos-side.service';

describe('PosSideService', () => {
  let service: PosSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
