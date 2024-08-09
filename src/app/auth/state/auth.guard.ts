import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from './auth.state';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
	return this.store.select(AuthState.isLoggedIn).pipe(
	  take(1),
	  map(isLoggedIn => {
		if (isLoggedIn) {
		  return true;
		} else {
		  this.router.navigate(['/login']);
		  return false;
		}
	  })
	);
  }
}
