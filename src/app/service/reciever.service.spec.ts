import { TestBed } from '@angular/core/testing';

import { RecieverService } from './reciever.service';

describe('RecieverService', () => {
  let service: RecieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
