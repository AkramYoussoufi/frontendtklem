import { TestBed } from '@angular/core/testing';

import { ReceptorService } from './receptor.service';

describe('ReceptorService', () => {
  let service: ReceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
