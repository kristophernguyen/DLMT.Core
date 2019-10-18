import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsPlancheckViewComponent } from './dlmt-details-plancheck-view.component';

describe('DlmtDetailsPlancheckViewComponent', () => {
  let component: DlmtDetailsPlancheckViewComponent;
  let fixture: ComponentFixture<DlmtDetailsPlancheckViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsPlancheckViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsPlancheckViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
