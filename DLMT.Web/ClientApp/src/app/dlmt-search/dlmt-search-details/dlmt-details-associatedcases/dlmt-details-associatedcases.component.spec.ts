import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsAssociatedcasesComponent } from './dlmt-details-associatedcases.component';

describe('DlmtDetailsAssociatedcasesComponent', () => {
  let component: DlmtDetailsAssociatedcasesComponent;
  let fixture: ComponentFixture<DlmtDetailsAssociatedcasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsAssociatedcasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsAssociatedcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
