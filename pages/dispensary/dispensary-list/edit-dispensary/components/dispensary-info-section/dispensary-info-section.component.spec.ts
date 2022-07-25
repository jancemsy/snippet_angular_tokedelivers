import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryInfoSectionComponent } from './dispensary-info-section.component';

describe('DispensaryInfoSectionComponent', () => {
  let component: DispensaryInfoSectionComponent;
  let fixture: ComponentFixture<DispensaryInfoSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryInfoSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryInfoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
