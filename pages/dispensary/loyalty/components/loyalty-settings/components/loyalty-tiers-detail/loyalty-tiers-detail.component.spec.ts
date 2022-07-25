import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyTiersDetailComponent } from './loyalty-tiers-detail.component';

describe('LoyaltyTiersDetailComponent', () => {
  let component: LoyaltyTiersDetailComponent;
  let fixture: ComponentFixture<LoyaltyTiersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTiersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyTiersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
