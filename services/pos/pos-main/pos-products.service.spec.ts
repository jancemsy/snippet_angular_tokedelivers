import { TestBed } from '@angular/core/testing';

import { PosProductsService } from './pos-products.service';

describe('PosProductsService', () => {
  let service: PosProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
