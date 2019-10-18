import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsPlancheckComponent } from './dlmt-details-plancheck.component';

describe('DlmtDetailsPlancheckComponent', () => {
  let component: DlmtDetailsPlancheckComponent;
  let fixture: ComponentFixture<DlmtDetailsPlancheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsPlancheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsPlancheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
