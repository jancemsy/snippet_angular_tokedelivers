import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CannUserInfoComponent } from './cann-user-info.component';

xdescribe('CannUserInfoComponent', () => {
  let component: CannUserInfoComponent;
  let fixture: ComponentFixture<CannUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CannUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CannUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
