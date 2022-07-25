import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransCompleteComponent } from './trans-complete.component';

describe('TransCompleteComponent', () => {
  let component: TransCompleteComponent;
  let fixture: ComponentFixture<TransCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
