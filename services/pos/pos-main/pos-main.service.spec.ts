import { TestBed } from '@angular/core/testing';

import { PosMainService } from './pos-main.service';

describe('PosMainService', () => {
  let service: PosMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
