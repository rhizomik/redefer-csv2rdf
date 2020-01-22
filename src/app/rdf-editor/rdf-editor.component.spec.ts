import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdfEditorComponent } from './rdf-editor.component';

describe('RdfEditorComponent', () => {
  let component: RdfEditorComponent;
  let fixture: ComponentFixture<RdfEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdfEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdfEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
