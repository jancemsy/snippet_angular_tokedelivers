import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryEmployeesComponent } from './dispensary-employees.component';

xdescribe('DispensaryEmployeesComponent', () => {
  let component: DispensaryEmployeesComponent;
  let fixture: ComponentFixture<DispensaryEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
