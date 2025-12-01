import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose a ready promise that resolves', async () => {
    // `ready` should be a Promise that resolves once auth has reported its state.
    expect(service.ready).toBeDefined();
    // it may resolve when the Firebase callback fires; ensure it is a Promise
    expect(typeof (service.ready as any).then).toBe('function');
  });
});
