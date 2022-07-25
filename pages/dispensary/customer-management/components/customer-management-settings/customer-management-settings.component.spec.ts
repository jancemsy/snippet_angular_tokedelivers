import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementSettingsComponent } from './customer-management-settings.component';

describe('CustomerManagementSettingsComponent', () => {
  let component: CustomerManagementSettingsComponent;
  let fixture: ComponentFixture<CustomerManagementSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
