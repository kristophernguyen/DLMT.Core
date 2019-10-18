import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsAssociatedcaseComponent } from './dlmt-details-associatedcase.component';

describe('DlmtDetailsAssociatedcaseComponent', () => {
  let component: DlmtDetailsAssociatedcaseComponent;
  let fixture: ComponentFixture<DlmtDetailsAssociatedcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsAssociatedcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsAssociatedcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
