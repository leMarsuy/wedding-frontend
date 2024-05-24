import { TestBed } from '@angular/core/testing';

import { WeddingApiService } from './wedding-api.service';

describe('WeddingApiService', () => {
  let service: WeddingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeddingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
