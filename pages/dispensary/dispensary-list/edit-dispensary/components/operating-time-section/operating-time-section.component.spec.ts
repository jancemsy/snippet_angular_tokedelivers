import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingTimeSectionComponent } from './operating-time-section.component';

describe('OperatingTimeSectionComponent', () => {
  let component: OperatingTimeSectionComponent;
  let fixture: ComponentFixture<OperatingTimeSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingTimeSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingTimeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
