import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurepageComponent } from './securepage.component';

describe('SecurepageComponent', () => {
  let component: SecurepageComponent;
  let fixture: ComponentFixture<SecurepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
