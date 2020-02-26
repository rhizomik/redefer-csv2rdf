import { TestBed } from '@angular/core/testing';

import { VocabSuggestService } from './vocab-suggest.service';

describe('VocabSuggestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VocabSuggestService = TestBed.get(VocabSuggestService);
    expect(service).toBeTruthy();
  });
});
