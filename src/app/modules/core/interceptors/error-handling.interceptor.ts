import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions'
import { Store } from '@ngrx/store';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.status === 401) {
          this.logout();
        }

        if (error.status >= 400 && error.status < 500) {
          errorMsg = error.error.message || 'Wystąpił błąd, spróbuj ponownie';
        } else {
          errorMsg = 'Wystąpił błąd. Spróbuj ponownie';
        }

        return throwError(() => new Error(errorMsg));
      })
    );
  }

  private logout() {
    this.store.dispatch(AuthActions.logout());
  }
}