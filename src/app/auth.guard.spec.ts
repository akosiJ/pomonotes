import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { authGuard } from './auth.guard';
import { Router } from '@angular/router';
import { Auth } from './services/auth';

describe('authGuard', () => {
  let mockAuth: Partial<Auth> & { user: any };

  beforeEach(() => {
    // mock Auth where `ready` is already resolved so guard can proceed
    mockAuth = {
      user: signal(null),
      ready: Promise.resolve(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: mockAuth },
        // router isn't used for navigation because the guard returns a UrlTree
        { provide: Router, useValue: { parseUrl: (url: string) => url } },
      ],
    });
  });

  it('allows when user exists', async () => {
    mockAuth.user.set({} as any);

    // run the guard inside the TestBed injection context
    const result = await TestBed.runInInjectionContext(async () => authGuard());
    expect(result).toBe(true);
  });

  it('redirects to /login when no user', async () => {
    mockAuth.user.set(null);

    const result = await TestBed.runInInjectionContext(async () => authGuard());
    // our fake router.parseUrl returns the string route
    expect(result).toBe('/login');
  });
});
