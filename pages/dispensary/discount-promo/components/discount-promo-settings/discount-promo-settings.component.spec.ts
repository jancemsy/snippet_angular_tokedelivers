import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountPromoSettingsComponent } from './discount-promo-settings.component';

describe('DiscountPromoSettingsComponent', () => {
  let component: DiscountPromoSettingsComponent;
  let fixture: ComponentFixture<DiscountPromoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountPromoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountPromoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
