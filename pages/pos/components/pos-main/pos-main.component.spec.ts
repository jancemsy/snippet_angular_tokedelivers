import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosMainComponent } from './pos-main.component';

describe('PosMainComponent', () => {
  let component: PosMainComponent;
  let fixture: ComponentFixture<PosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
