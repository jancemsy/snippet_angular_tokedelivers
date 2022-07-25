import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DollarDiscountComponent } from './dollar-discount.component';

describe('DollarDiscountComponent', () => {
  let component: DollarDiscountComponent;
  let fixture: ComponentFixture<DollarDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DollarDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DollarDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
