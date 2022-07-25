import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LocalStorageService } from '../utilities/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  tokenExemptedUrls: string[] = [
    '/login',
    '/logout',
    '/user/validate/email',
    '/company/validate/name',
    '/registration/partial/new',
    '/password/validate/token',
    '/registration/customer/new',
    '/registration/dispensary/new',
    '/password/reset',
    '/password/change',
    '/password/change',
    '/products',
    '/products/detail',
    'dispensary',
    'cart'
  ];

  constructor(
    private router: Router,
    private _localStorage: LocalStorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (request.headers.get('No-Auth') === "True"){
      return next.handle(request); 
    }else if (this._isExemptedUrls(request.url)) {
      return next.handle(request);
    } else {
      /**
       * Placing of token in authorization should be
       * place here
       */
      const loginInfo = this._localStorage.retrieveItem('loginInfo');

      if (loginInfo) {
        const { access_token } = loginInfo;

        if (access_token) {
          request = request.clone({headers: request.headers.set('Authorization', `Bearer ${access_token}`)});
        }

        return next.handle(request)
          .pipe(
            tap((response: any) => response),
            catchError(error => {
              if (error instanceof HttpErrorResponse) {
                // HTTP Error 401 - Unauthorized
                if (error.status === 401) {
                  this._localStorage.reset(); // Purge the localstorage
                  location.href = 'auth/login';
                }
              }
              return throwError(error);
            }),
          );
      }
    }
  }

  private _isExemptedUrls(url) {
    let isExempted = false;

    this.tokenExemptedUrls.forEach(item => {
      const index = url.indexOf(item);

      if (index >= 0) {
        isExempted = true;
      }
    });

    return isExempted;
  }
}
