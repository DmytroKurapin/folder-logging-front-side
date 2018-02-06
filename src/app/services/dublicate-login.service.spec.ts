import { TestBed, inject } from '@angular/core/testing';

import { DublicateLoginService } from './dublicate-login.service';

describe('DublicateLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DublicateLoginService]
    });
  });

  it('should be created', inject([DublicateLoginService], (service: DublicateLoginService) => {
    expect(service).toBeTruthy();
  }));
});
