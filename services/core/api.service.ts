import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  /**
   * API Base URL
   */
  private readonly base_url: string = env.apiBase + '/v1';

  // Setup Request Header
  public _headers$: HttpHeaders;
  public _options$: any;

  constructor(private http: HttpClient) 
  {
    this._headers$ = new HttpHeaders({
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('loginInfo')).access_token,
      'Accept': 'application/json'
    });

    this._options$ = {
      headers: this._headers$
    }
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, headers: Object = this._options$): Observable<any> {
    return this.http.get(`${this.base_url}${path}`, 
      headers)
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}, headers: Object = this._options$): Observable<any> {
    return this.http.post(
      `${this.base_url}${path}`, 
      body,
      headers
    ).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, headers: Object = this._options$): Observable<any> {
    return this.http.put(
      `${this.base_url}${path}`,
      body,
      headers
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string, body: Object = {}): Observable<any> {
    
    this._options$.body = body;

    return this.http.request('delete',
      `${this.base_url}${path}`,
      this._options$
    ).pipe(catchError(this.formatErrors));

  }
}
