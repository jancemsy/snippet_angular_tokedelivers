import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

    public headers: HttpHeaders;
    public options: any;

    /**
     * API Base URL
     */
    private readonly base_url: string = env.apiBase + '/v1';
  
    constructor(
      private httpClient: HttpClient
    ) { 
      this.headers = new HttpHeaders({
        'Accept': 'application/json',
        'No-Auth': 'True'
      });
  
      this.options = {
        headers: this.headers
      }
  
    }

    private formatErrors(error: any) {
        return throwError(error);
    }

    registerNewCustomer(body)
    {
        return this.httpClient.post(`${this.base_url}/registration/new/customer`, body, this.options).pipe(catchError(this.formatErrors));
    }

    registerNewDispensary(body)
    {
        return this.httpClient.post(`${this.base_url}/registration/new/dispensary`, body, this.options).pipe(catchError(this.formatErrors));
    }
}