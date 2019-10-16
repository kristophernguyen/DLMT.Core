import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsOverviewComponent } from './dlmt-details-overview.component';

describe('DlmtDetailsOverviewComponent', () => {
  let component: DlmtDetailsOverviewComponent;
  let fixture: ComponentFixture<DlmtDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
