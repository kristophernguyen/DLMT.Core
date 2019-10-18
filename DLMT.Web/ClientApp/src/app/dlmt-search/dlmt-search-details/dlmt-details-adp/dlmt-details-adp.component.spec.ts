import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsAdpComponent } from './dlmt-details-adp.component';

describe('DlmtDetailsAdpComponent', () => {
  let component: DlmtDetailsAdpComponent;
  let fixture: ComponentFixture<DlmtDetailsAdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsAdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsAdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
