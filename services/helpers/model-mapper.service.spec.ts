import { TestBed } from '@angular/core/testing';

import { ModelMapperService } from './model-mapper.service';

describe('ModelMapperService', () => {
  let service: ModelMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
