import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedIn } from '../signals/auth.signal';

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  if (isLoggedIn()) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
