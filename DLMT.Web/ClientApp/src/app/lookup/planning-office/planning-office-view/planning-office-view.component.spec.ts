import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOfficeViewComponent } from './planning-office-view.component';

describe('PlanningOfficeViewComponent', () => {
  let component: PlanningOfficeViewComponent;
  let fixture: ComponentFixture<PlanningOfficeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningOfficeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningOfficeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
