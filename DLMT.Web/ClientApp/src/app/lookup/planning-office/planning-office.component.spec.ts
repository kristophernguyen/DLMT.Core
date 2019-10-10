import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningOfficeComponent } from './planning-office.component';

describe('PlanningOfficeComponent', () => {
  let component: PlanningOfficeComponent;
  let fixture: ComponentFixture<PlanningOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
