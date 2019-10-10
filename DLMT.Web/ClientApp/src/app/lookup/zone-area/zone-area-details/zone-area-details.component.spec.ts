import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAreaDetailsComponent } from './zone-area-details.component';

describe('ZoneAreaDetailsComponent', () => {
  let component: ZoneAreaDetailsComponent;
  let fixture: ComponentFixture<ZoneAreaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneAreaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneAreaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
