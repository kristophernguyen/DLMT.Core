import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNolayoutComponent } from './site-nolayout.component';

describe('SiteNolayoutComponent', () => {
  let component: SiteNolayoutComponent;
  let fixture: ComponentFixture<SiteNolayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNolayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNolayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
