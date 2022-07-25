/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainSlugsStateService } from './main-slugs-state.service';

describe('Service: MainSlugsState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainSlugsStateService]
    });
  });

  it('should ...', inject([MainSlugsStateService], (service: MainSlugsStateService) => {
    expect(service).toBeTruthy();
  }));
});
