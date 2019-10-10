import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneAreaComponent } from './zone-area.component';

describe('ZoneAreaComponent', () => {
  let component: ZoneAreaComponent;
  let fixture: ComponentFixture<ZoneAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
