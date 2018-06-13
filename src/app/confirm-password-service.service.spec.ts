import { TestBed, inject } from '@angular/core/testing';

import { ConfirmPasswordServiceService } from './confirm-password-service.service';

describe('ConfirmPasswordServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmPasswordServiceService]
    });
  });

  it('should be created', inject([ConfirmPasswordServiceService], (service: ConfirmPasswordServiceService) => {
    expect(service).toBeTruthy();
  }));
});
