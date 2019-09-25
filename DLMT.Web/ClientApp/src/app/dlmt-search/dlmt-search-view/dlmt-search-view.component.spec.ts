import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtSearchViewComponent } from './dlmt-search-view.component';

describe('DlmtSearchViewComponent', () => {
  let component: DlmtSearchViewComponent;
  let fixture: ComponentFixture<DlmtSearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtSearchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
