import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTimesComponent } from './operation-times.component';

describe('OperationTimesComponent', () => {
  let component: OperationTimesComponent;
  let fixture: ComponentFixture<OperationTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
