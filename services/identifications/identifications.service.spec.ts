import { TestBed } from '@angular/core/testing';

import { IdentificationsService } from './identifications.service';

describe('IdentificationsService', () => {
  let service: IdentificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
