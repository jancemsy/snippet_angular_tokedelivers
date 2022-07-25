import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyRewardComponent } from './loyalty-reward.component';

describe('LoyaltyRewardComponent', () => {
  let component: LoyaltyRewardComponent;
  let fixture: ComponentFixture<LoyaltyRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyRewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
