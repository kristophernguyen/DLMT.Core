import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtCaseNewComponent } from './dlmt-case-new.component';

describe('DlmtCaseNewComponent', () => {
  let component: DlmtCaseNewComponent;
  let fixture: ComponentFixture<DlmtCaseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtCaseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtCaseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
