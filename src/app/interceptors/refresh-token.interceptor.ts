import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, concatMap, Observable, switchMap, take, throwError } from 'rxjs';
import { UsersService } from '../services/users.service';
import { Store } from '@ngrx/store';
import * as userSelectors from '../users/state/users.selectors';
import * as userActions from '../users/state/users.actions';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private authService: UsersService, private store: Store) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.error.message === 'JWT_EXPIRED') {
          return this.refreshToken(request, next);
        }
        else {
          return throwError(err);
        }
      })
    );
  }


  refreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    return this.store.select(userSelectors.refreshToken)
      .pipe(
        take(1),
        concatMap(refreshToken => {
          return this.authService.refreshToken({ refreshToken }).pipe(
            concatMap((refreshResponse: any) => {
              this.store.dispatch(userActions.accessTokenUpdated({ accessToken: refreshResponse.accessToken }));
              localStorage.setItem('accessToken', refreshResponse.accessToken)
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${refreshResponse.accessToken}`
                }
              });
              return next.handle(request);
            })
          )
        })
      );
  }

}
