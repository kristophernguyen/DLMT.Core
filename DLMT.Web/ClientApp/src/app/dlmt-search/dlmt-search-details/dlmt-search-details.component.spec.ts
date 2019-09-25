import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtSearchDetailsComponent } from './dlmt-search-details.component';

describe('DlmtSearchDetailsComponent', () => {
  let component: DlmtSearchDetailsComponent;
  let fixture: ComponentFixture<DlmtSearchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtSearchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
