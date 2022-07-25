import { TestBed } from '@angular/core/testing';

import { PosTopService } from './pos-top.service';

describe('PosTopService', () => {
  let service: PosTopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosTopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
