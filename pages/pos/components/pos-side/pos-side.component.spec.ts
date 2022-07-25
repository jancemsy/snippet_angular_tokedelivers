import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSideComponent } from './pos-side.component';

describe('PosSideComponent', () => {
  let component: PosSideComponent;
  let fixture: ComponentFixture<PosSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
