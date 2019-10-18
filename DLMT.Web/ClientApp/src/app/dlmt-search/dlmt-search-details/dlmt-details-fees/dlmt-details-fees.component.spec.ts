import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsFeesComponent } from './dlmt-details-fees.component';

describe('DlmtDetailsFeesComponent', () => {
  let component: DlmtDetailsFeesComponent;
  let fixture: ComponentFixture<DlmtDetailsFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
