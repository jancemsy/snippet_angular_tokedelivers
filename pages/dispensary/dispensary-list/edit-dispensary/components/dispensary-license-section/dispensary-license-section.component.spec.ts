import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryLicenseSectionComponent } from './dispensary-license-section.component';

xdescribe('DispensaryLicenseSectionComponent', () => {
  let component: DispensaryLicenseSectionComponent;
  let fixture: ComponentFixture<DispensaryLicenseSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryLicenseSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryLicenseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
