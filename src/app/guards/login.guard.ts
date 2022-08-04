import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as userSelectors from '../modules/users/state/users.selectors';
import { AppState } from '../state/app-state';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(userSelectors.loggedUser)
      .pipe(
        map(loggedUser => {
          if (loggedUser) {
            this.router.navigate(['specific']);
            return false;
          }
          return true;
        })
      )
  }

}
