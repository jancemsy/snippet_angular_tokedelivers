import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySettingsComponent } from './loyalty-settings.component';

describe('LoyaltySettingsComponent', () => {
  let component: LoyaltySettingsComponent;
  let fixture: ComponentFixture<LoyaltySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
