import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsDocumentsComponent } from './dlmt-details-documents.component';

describe('DlmtDetailsDocumentsComponent', () => {
  let component: DlmtDetailsDocumentsComponent;
  let fixture: ComponentFixture<DlmtDetailsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
