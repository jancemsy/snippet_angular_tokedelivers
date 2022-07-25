import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDispensaryComponent } from './create-dispensary.component';

describe('CreateDispensaryComponent', () => {
  let component: CreateDispensaryComponent;
  let fixture: ComponentFixture<CreateDispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
