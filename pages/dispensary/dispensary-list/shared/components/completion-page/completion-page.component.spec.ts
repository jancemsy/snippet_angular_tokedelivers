import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionPageComponent } from './completion-page.component';

describe('CompletionPageComponent', () => {
  let component: CompletionPageComponent;
  let fixture: ComponentFixture<CompletionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
