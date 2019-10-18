import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlmtDetailsTentativereviewViewComponent } from './dlmt-details-tentativereview-view.component';

describe('DlmtDetailsTentativereviewViewComponent', () => {
  let component: DlmtDetailsTentativereviewViewComponent;
  let fixture: ComponentFixture<DlmtDetailsTentativereviewViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlmtDetailsTentativereviewViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlmtDetailsTentativereviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
