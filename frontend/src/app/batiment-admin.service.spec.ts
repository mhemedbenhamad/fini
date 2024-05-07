import { TestBed } from '@angular/core/testing';

import { BatimentAdminService } from './batiment-admin.service';

describe('BatimentAdminService', () => {
  let service: BatimentAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatimentAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
