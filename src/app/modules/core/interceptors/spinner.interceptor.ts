import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { SpinnerService } from '../services/spinner.service';
import { finalize, Observable } from 'rxjs';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();
    return next.handle(request).pipe(
      finalize(()=> this.spinnerService.hide())
    );
  }
}
