import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsDetailsComponent } from './rewards-details.component';

describe('RewardsDetailsComponent', () => {
  let component: RewardsDetailsComponent;
  let fixture: ComponentFixture<RewardsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
