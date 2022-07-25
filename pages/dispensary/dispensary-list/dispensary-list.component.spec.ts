import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryListComponent } from './dispensary-list.component';

describe('DispensaryListComponent', () => {
  let component: DispensaryListComponent;
  let fixture: ComponentFixture<DispensaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
