import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryInformationComponent } from './dispensary-information.component';

describe('DispensaryInformationComponent', () => {
  let component: DispensaryInformationComponent;
  let fixture: ComponentFixture<DispensaryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
