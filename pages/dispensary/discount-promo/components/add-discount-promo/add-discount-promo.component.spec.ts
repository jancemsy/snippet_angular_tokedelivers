import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountPromoComponent } from './add-discount-promo.component';

describe('AddDiscountPromoComponent', () => {
  let component: AddDiscountPromoComponent;
  let fixture: ComponentFixture<AddDiscountPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscountPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
