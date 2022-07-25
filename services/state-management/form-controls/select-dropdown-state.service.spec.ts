import { TestBed } from '@angular/core/testing';

import { SelectDropdownStateService } from './select-dropdown-state.service';

describe('SelectDropdownStateService', () => {
  let service: SelectDropdownStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectDropdownStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
