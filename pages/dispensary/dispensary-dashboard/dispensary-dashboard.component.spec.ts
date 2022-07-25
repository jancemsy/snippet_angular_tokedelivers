import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryDashboardComponent } from './dispensary-dashboard.component';

describe('DispensaryDashboardComponent', () => {
  let component: DispensaryDashboardComponent;
  let fixture: ComponentFixture<DispensaryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
