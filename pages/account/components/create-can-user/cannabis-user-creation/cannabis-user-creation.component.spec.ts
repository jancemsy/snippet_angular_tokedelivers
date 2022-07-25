import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CannabisUserCreationComponent } from './cannabis-user-creation.component';

xdescribe('CannabisUserCreationComponent', () => {
  let component: CannabisUserCreationComponent;
  let fixture: ComponentFixture<CannabisUserCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CannabisUserCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannabisUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
