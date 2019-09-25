import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtSearchComponent } from './dlmt-search.component';

describe('DlmtSearchComponent', () => {
  let component: DlmtSearchComponent;
  let fixture: ComponentFixture<DlmtSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
