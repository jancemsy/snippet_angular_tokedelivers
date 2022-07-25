import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryComponent } from './dispensary.component';

xdescribe('DispensaryComponent', () => {
  let component: DispensaryComponent;
  let fixture: ComponentFixture<DispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
