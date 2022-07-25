import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListSectionComponent } from './employee-list-section.component';

describe('EmployeeListSectionComponent', () => {
  let component: EmployeeListSectionComponent;
  let fixture: ComponentFixture<EmployeeListSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
