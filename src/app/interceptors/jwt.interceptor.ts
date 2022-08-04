import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { concatMap, Observable, take } from 'rxjs';
import * as userSelectors from '../modules/users/state/users.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '../state/app-state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.store.select(userSelectors.accessToken)
      .pipe(
        take(1),
        concatMap(accessToken => {
          if (accessToken && request.url.startsWith(environment.apiUrl)) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${accessToken}`
              }
            })
          }
          return next.handle(request);
        })
      );
  }
}
