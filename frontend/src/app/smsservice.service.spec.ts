import { TestBed } from '@angular/core/testing';

import { SmsserviceService } from './smsservice.service';

describe('SmsserviceService', () => {
  let service: SmsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
