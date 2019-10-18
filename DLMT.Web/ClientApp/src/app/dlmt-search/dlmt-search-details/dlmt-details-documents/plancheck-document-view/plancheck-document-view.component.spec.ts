import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlancheckDocumentViewComponent } from './plancheck-document-view.component';

describe('PlancheckDocumentViewComponent', () => {
  let component: PlancheckDocumentViewComponent;
  let fixture: ComponentFixture<PlancheckDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlancheckDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlancheckDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
