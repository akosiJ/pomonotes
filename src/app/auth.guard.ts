// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from './services/auth';
/**
 *
 * Guard that waits for Firebase auth state to load before checking status.
 */
export const authGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Wait until the Auth service has reported its initial state so we don't
  // make a premature decision while Firebase is still restoring a session.
  await auth.ready;

  const isAuthenticated = !!auth.user();
  if (!isAuthenticated) {
    // Return a UrlTree so the router handles the redirect cleanly instead of
    // performing an extra navigation from inside the guard.
    return router.parseUrl('/login');
  }

  return true;
};
