import { TestBed } from '@angular/core/testing';

import { OpenDispensariesService } from './open-dispensaries.service';

xdescribe('OpenDispensariesService', () => {
  let service: OpenDispensariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDispensariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
