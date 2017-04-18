import { TestBed, inject } from '@angular/core/testing';

import { HaLoaderService } from './ha-loader.service';

describe('HaLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HaLoaderService]
    });
  });

  it('should ...', inject([HaLoaderService], (service: HaLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
