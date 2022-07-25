import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAgeComponent } from './verify-age.component';

xdescribe('VerifyAgeComponent', () => {
  let component: VerifyAgeComponent;
  let fixture: ComponentFixture<VerifyAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
