import { TestBed } from '@angular/core/testing';

import { SignupStepsService } from './signup-steps.service';

xdescribe('SignupStepsService', () => {
  let service: SignupStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
