import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTransformationsComponent } from './my-transformations.component';

describe('MyTransformationsComponent', () => {
  let component: MyTransformationsComponent;
  let fixture: ComponentFixture<MyTransformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTransformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTransformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
