import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../auth/store/auth.actions'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.getCookie('Authorization');

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });

      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.error &&
            error.error.exception === 'AuthNotFoundInCookieException'
          ) {
            console.log("wyloguje")
            this.logout();
          }
          return throwError(() => error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }

  private logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
