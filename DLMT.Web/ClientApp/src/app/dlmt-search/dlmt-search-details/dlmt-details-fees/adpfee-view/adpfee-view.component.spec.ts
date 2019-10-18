import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdpfeeViewComponent } from './adpfee-view.component';

describe('AdpfeeViewComponent', () => {
  let component: AdpfeeViewComponent;
  let fixture: ComponentFixture<AdpfeeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdpfeeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdpfeeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
