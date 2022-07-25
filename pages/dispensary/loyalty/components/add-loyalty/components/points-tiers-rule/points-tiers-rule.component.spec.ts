import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsTiersRuleComponent } from './points-tiers-rule.component';

describe('PointsTiersRuleComponent', () => {
  let component: PointsTiersRuleComponent;
  let fixture: ComponentFixture<PointsTiersRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsTiersRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsTiersRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
