import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeSelectionComponent } from './account-type-selection.component';

xdescribe('AccountTypeSelectionComponent', () => {
  let component: AccountTypeSelectionComponent;
  let fixture: ComponentFixture<AccountTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
