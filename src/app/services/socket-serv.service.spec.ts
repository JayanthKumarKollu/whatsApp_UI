import { TestBed } from '@angular/core/testing';

import { SocketServService } from './socket-serv.service';

describe('SocketServService', () => {
  let service: SocketServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
