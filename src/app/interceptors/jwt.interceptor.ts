import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { concatMap, Observable } from 'rxjs';
import * as userSelectors from '../users/state/users.selectors';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return this.store.select(userSelectors.accessToken)
      .pipe(
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
