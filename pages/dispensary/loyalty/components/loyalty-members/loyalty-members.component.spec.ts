import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyMembersComponent } from './loyalty-members.component';

describe('LoyaltyMembersComponent', () => {
  let component: LoyaltyMembersComponent;
  let fixture: ComponentFixture<LoyaltyMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
