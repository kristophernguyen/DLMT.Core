import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTypeViewComponent } from './case-type-view.component';

describe('CaseTypeViewComponent', () => {
  let component: CaseTypeViewComponent;
  let fixture: ComponentFixture<CaseTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
