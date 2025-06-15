import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canActiveGuardGuard } from './can-active-guard.guard';

describe('canActiveGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canActiveGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
