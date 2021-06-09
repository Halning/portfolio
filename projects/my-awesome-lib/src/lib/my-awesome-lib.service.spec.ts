import { TestBed } from '@angular/core/testing';

import { MyAwesomeLibService } from './my-awesome-lib.service';

describe('MyAwesomeLibService', () => {
  let service: MyAwesomeLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyAwesomeLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
