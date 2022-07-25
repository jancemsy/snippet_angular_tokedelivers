import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountGroupAddComponent } from './discount-group-add.component';

describe('DiscountGroupAddComponent', () => {
  let component: DiscountGroupAddComponent;
  let fixture: ComponentFixture<DiscountGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
