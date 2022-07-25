import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDispensaryComponent } from './edit-dispensary.component';

describe('EditDispensaryComponent', () => {
  let component: EditDispensaryComponent;
  let fixture: ComponentFixture<EditDispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
