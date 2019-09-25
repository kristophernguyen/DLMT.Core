import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtHeaderComponent } from './dlmt-header.component';

describe('DlmtHeaderComponent', () => {
  let component: DlmtHeaderComponent;
  let fixture: ComponentFixture<DlmtHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
