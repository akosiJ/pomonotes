import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from './services/auth';

/**
 * Simple guard for protecting authenticated routes. If the user is not
 * authenticated, redirects to /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuthenticated) return true;

  // not authenticated -> redirect to login
  router.navigate(['/login']);
  return false;
};
