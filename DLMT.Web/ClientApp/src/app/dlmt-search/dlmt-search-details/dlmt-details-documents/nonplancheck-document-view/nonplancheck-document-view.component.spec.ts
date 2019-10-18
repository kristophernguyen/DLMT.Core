import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonplancheckDocumentViewComponent } from './nonplancheck-document-view.component';

describe('NonplancheckDocumentViewComponent', () => {
  let component: NonplancheckDocumentViewComponent;
  let fixture: ComponentFixture<NonplancheckDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonplancheckDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonplancheckDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
