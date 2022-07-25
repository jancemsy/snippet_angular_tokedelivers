import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosScanComponent } from './pos-scan.component';

describe('PosScanComponent', () => {
  let component: PosScanComponent;
  let fixture: ComponentFixture<PosScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
