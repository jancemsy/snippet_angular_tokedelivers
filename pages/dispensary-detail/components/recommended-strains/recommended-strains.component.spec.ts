import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedStrainsComponent } from './recommended-strains.component';

describe('RecommendedStrainsComponent', () => {
  let component: RecommendedStrainsComponent;
  let fixture: ComponentFixture<RecommendedStrainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedStrainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedStrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
