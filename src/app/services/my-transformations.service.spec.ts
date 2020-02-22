import { TestBed } from '@angular/core/testing';

import { MyTransformationsService } from './my-transformations.service';

describe('MyTransformationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTransformationsService = TestBed.get(MyTransformationsService);
    expect(service).toBeTruthy();
  });
});
