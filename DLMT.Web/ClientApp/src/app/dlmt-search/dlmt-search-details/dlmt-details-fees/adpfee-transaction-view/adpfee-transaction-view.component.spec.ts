import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpfeeTransactionViewComponent } from './adpfee-transaction-view.component';

describe('AdpfeeTransactionViewComponent', () => {
  let component: AdpfeeTransactionViewComponent;
  let fixture: ComponentFixture<AdpfeeTransactionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpfeeTransactionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpfeeTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
