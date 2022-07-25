import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoyaltyComponent } from './add-loyalty.component';

describe('AddLoyaltyComponent', () => {
  let component: AddLoyaltyComponent;
  let fixture: ComponentFixture<AddLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
