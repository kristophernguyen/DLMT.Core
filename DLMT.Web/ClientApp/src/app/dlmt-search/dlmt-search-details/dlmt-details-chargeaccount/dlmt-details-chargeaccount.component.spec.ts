import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsChargeaccountComponent } from './dlmt-details-chargeaccount.component';

describe('DlmtDetailsChargeaccountComponent', () => {
  let component: DlmtDetailsChargeaccountComponent;
  let fixture: ComponentFixture<DlmtDetailsChargeaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsChargeaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsChargeaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
