import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsDeveloperComponent } from './dlmt-details-developer.component';

describe('DlmtDetailsDeveloperComponent', () => {
  let component: DlmtDetailsDeveloperComponent;
  let fixture: ComponentFixture<DlmtDetailsDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
