import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsPlottingComponent } from './dlmt-details-plotting.component';

describe('DlmtDetailsPlottingComponent', () => {
  let component: DlmtDetailsPlottingComponent;
  let fixture: ComponentFixture<DlmtDetailsPlottingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsPlottingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsPlottingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
