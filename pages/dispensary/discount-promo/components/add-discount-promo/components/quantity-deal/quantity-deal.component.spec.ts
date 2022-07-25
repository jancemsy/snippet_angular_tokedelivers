import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityDealComponent } from './quantity-deal.component';

describe('QuantityDealComponent', () => {
  let component: QuantityDealComponent;
  let fixture: ComponentFixture<QuantityDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
