import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryInfoFormComponent } from './dispensary-info-form.component';

xdescribe('DispensaryInfoFormComponent', () => {
  let component: DispensaryInfoFormComponent;
  let fixture: ComponentFixture<DispensaryInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
