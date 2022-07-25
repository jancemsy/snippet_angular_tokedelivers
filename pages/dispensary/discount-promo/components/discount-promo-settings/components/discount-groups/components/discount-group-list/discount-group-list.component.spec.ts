import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountGroupListComponent } from './discount-group-list.component';

describe('DiscountGroupListComponent', () => {
  let component: DiscountGroupListComponent;
  let fixture: ComponentFixture<DiscountGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
