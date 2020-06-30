import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../authentication/services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.loginService.getToken();
    let newHeaders = request.headers;
    if (token) {
      console.log('Token is there...');
      newHeaders = newHeaders.append('x-access-token', token);
    }
    const authReq = request.clone({headers: newHeaders});
    return next.handle(authReq);
  }
}
