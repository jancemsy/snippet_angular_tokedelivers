import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseInformationComponent } from './license-information.component';

xdescribe('LicenseInformationComponent', () => {
  let component: LicenseInformationComponent;
  let fixture: ComponentFixture<LicenseInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
