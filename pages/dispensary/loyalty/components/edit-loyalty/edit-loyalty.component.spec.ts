import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoyaltyComponent } from './edit-loyalty.component';

describe('EditLoyaltyComponent', () => {
  let component: EditLoyaltyComponent;
  let fixture: ComponentFixture<EditLoyaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoyaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoyaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
