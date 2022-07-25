import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDispensaryComponent } from './add-dispensary.component';

describe('AddDispensaryComponent', () => {
  let component: AddDispensaryComponent;
  let fixture: ComponentFixture<AddDispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
