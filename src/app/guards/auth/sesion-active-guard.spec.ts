import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sesionActiveGuard } from './sesion-active-guard';

describe('sesionActiveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sesionActiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
