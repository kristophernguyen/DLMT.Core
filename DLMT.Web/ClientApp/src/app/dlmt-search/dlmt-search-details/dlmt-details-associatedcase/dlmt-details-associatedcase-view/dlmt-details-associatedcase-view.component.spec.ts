import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsAssociatedcaseViewComponent } from './dlmt-details-associatedcase-view.component';

describe('DlmtDetailsAssociatedcaseViewComponent', () => {
  let component: DlmtDetailsAssociatedcaseViewComponent;
  let fixture: ComponentFixture<DlmtDetailsAssociatedcaseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsAssociatedcaseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsAssociatedcaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
