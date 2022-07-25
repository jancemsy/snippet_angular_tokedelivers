import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountLimitsComponent } from './discount-limits.component';

describe('DiscountLimitsComponent', () => {
  let component: DiscountLimitsComponent;
  let fixture: ComponentFixture<DiscountLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
