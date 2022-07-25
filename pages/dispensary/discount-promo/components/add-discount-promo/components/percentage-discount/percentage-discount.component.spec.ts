import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageDiscountComponent } from './percentage-discount.component';

describe('PercentageDiscountComponent', () => {
  let component: PercentageDiscountComponent;
  let fixture: ComponentFixture<PercentageDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PercentageDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentageDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
