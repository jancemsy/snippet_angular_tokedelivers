import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountGroupsComponent } from './discount-groups.component';

describe('DiscountGroupsComponent', () => {
  let component: DiscountGroupsComponent;
  let fixture: ComponentFixture<DiscountGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
