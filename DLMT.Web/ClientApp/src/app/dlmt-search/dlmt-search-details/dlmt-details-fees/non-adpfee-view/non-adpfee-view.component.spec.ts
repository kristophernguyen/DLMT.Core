import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdpfeeViewComponent } from './non-adpfee-view.component';

describe('NonAdpfeeViewComponent', () => {
  let component: NonAdpfeeViewComponent;
  let fixture: ComponentFixture<NonAdpfeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAdpfeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAdpfeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
