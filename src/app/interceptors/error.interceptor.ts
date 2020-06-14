import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((err) => {
        console.log('error is-->', err);
        console.log('error status-->', err.status);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500 && err.error && err.error.message) {
            alert('Server Error: ' + err.error.message);
          } else if (err.status === 401) {
            this.router.navigate(['/login']);
          } else if (err.status === 404) {
            alert('Error: 404 , Check your Inputs');
          }
        }
        return of(err);
      })
    );
  }
}
