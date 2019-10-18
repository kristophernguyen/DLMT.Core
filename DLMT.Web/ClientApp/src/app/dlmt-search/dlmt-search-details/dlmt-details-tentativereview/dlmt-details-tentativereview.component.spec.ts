import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsTentativereviewComponent } from './dlmt-details-tentativereview.component';

describe('DlmtDetailsTentativereviewComponent', () => {
  let component: DlmtDetailsTentativereviewComponent;
  let fixture: ComponentFixture<DlmtDetailsTentativereviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsTentativereviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsTentativereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
