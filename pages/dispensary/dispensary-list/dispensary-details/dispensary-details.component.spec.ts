import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryDetailsComponent } from './dispensary-details.component';

describe('DispensaryDetailsComponent', () => {
  let component: DispensaryDetailsComponent;
  let fixture: ComponentFixture<DispensaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
