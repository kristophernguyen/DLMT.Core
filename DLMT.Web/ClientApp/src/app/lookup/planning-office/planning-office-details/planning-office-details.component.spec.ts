import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOfficeDetailsComponent } from './planning-office-details.component';

describe('PlanningOfficeDetailsComponent', () => {
  let component: PlanningOfficeDetailsComponent;
  let fixture: ComponentFixture<PlanningOfficeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningOfficeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningOfficeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
