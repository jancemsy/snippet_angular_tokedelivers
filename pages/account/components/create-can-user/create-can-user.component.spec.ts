import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCanUserComponent } from './create-can-user.component';

xdescribe('CreateCanUserComponent', () => {
  let component: CreateCanUserComponent;
  let fixture: ComponentFixture<CreateCanUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCanUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
