import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTopComponent } from './pos-top.component';

describe('PosTopComponent', () => {
  let component: PosTopComponent;
  let fixture: ComponentFixture<PosTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
