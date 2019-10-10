import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAreaViewComponent } from './zone-area-view.component';

describe('ZoneAreaViewComponent', () => {
  let component: ZoneAreaViewComponent;
  let fixture: ComponentFixture<ZoneAreaViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneAreaViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneAreaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
