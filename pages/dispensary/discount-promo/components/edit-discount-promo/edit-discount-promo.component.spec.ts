import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscountPromoComponent } from './edit-discount-promo.component';

describe('EditDiscountPromoComponent', () => {
  let component: EditDiscountPromoComponent;
  let fixture: ComponentFixture<EditDiscountPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDiscountPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiscountPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
