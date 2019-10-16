import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsCasephaseComponent } from './dlmt-details-casephase.component';

describe('DlmtDetailsCasephaseComponent', () => {
  let component: DlmtDetailsCasephaseComponent;
  let fixture: ComponentFixture<DlmtDetailsCasephaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsCasephaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsCasephaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
