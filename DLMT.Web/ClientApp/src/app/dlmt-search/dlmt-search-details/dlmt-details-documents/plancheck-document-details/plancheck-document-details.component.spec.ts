import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlancheckDocumentDetailsComponent } from './plancheck-document-details.component';

describe('PlancheckDocumentDetailsComponent', () => {
  let component: PlancheckDocumentDetailsComponent;
  let fixture: ComponentFixture<PlancheckDocumentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlancheckDocumentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlancheckDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
