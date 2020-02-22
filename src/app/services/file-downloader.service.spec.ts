import { TestBed } from '@angular/core/testing';

import { FileDownloaderService } from './file-downloader.service';

describe('FileDownloaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileDownloaderService = TestBed.get(FileDownloaderService);
    expect(service).toBeTruthy();
  });
});
