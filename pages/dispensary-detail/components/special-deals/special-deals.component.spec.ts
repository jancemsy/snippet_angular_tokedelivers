import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDealsComponent } from './special-deals.component';

describe('SpecialDealsComponent', () => {
  let component: SpecialDealsComponent;
  let fixture: ComponentFixture<SpecialDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
