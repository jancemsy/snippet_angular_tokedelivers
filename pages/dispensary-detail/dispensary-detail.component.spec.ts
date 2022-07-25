import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryDetailComponent } from './dispensary-detail.component';

describe('DispensaryDetailComponent', () => {
  let component: DispensaryDetailComponent;
  let fixture: ComponentFixture<DispensaryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
