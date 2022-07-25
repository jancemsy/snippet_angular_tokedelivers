import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryItemComponent } from './dispensary-item.component';

describe('DispensaryItemComponent', () => {
  let component: DispensaryItemComponent;
  let fixture: ComponentFixture<DispensaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
