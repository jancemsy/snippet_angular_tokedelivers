import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensariesNearMeComponent } from './dispensaries-near-me.component';

describe('DispensariesNearMeComponent', () => {
  let component: DispensariesNearMeComponent;
  let fixture: ComponentFixture<DispensariesNearMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensariesNearMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensariesNearMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
