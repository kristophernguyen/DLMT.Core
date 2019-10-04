import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTypeDetailsComponent } from './case-type-details.component';

describe('CaseTypeDetailsComponent', () => {
  let component: CaseTypeDetailsComponent;
  let fixture: ComponentFixture<CaseTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
