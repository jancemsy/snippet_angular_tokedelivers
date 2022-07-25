import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreationThankYouComponent } from './account-creation-thank-you.component';

describe('AccountCreationThankYouComponent', () => {
  let component: AccountCreationThankYouComponent;
  let fixture: ComponentFixture<AccountCreationThankYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreationThankYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreationThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
