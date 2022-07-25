import { environment as env } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core'; 
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

/*
This is the copy of the main apiservice but
 with different type of restriction as this is mainly used for webstore.
*/
@Injectable({
  providedIn: 'root'
})
export class WebstoreApiService {
  
  /**
   * API Base URL
   */
  private readonly base_url: string = env.apiBase + '/v1';

  // Setup Request Header
  public _headers$: HttpHeaders;
  public _options$: any;  

  
  constructor( private http: HttpClient,  private _localStorage: LocalStorageService){ 
    let headers; 
    let loginInfo: any = this._localStorage.retrieveItem('loginInfo');    

    if (loginInfo && loginInfo.access_token) {
      let access_token = loginInfo.access_token;  
      headers = new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `Bearer ${access_token}`);
    }else{
      headers = new HttpHeaders().append('Content-Type', 'application/json').append('No-Auth','True' );
    }

    //console.log("headers",headers);
 
    this._options$ = { headers:  headers  };   
  }


  private formatErrors(error: any) { 
    console.log("formaterrors", error); 
    if(error && error.message && error.message == 'Invalid access token!'){ 
      //
    } 
    return throwError(error.error);
  }


  
  public get(path: string, headers: Object = this._options$): Observable<any> { 
    return this.http.get(`${this.base_url}${path}`, headers);//.pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: Object = {}, headers: Object = this._options$): Observable<any> {  
    return this.http.post(
      `${this.base_url}${path}`, 
      body,headers
    );//.pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: Object = {}, headers: Object = this._options$): Observable<any> {
    return this.http.put(
      `${this.base_url}${path}`,
      body,
      headers
    );//.pipe(catchError(this.formatErrors));
  }

  public delete(path: string, body: Object = {}): Observable<any> {
    
    this._options$.body = body;

    return this.http.request('delete',
      `${this.base_url}${path}`,
      this._options$
    );//.pipe(catchError(this.formatErrors));

  }


  public api_request( url, params, request_type, module, _success_callback: any = null): Promise<any> { 
    console.log("[api_request] ",url, params);

    let request: any;
    switch (request_type) {
      case 'put':
        request = this.put(url, params);
        break;
      case 'get':
        request = this.get(url);
        break;
      case 'delete':
        request = this.delete(url, params);
        break;
      default: 
        request = this.post(url, params);
        break;
    }

    if (_success_callback === null) {
      _success_callback = (success) => {
        console.log(module + ' success', success);
        return success;
      };
    }

    return Promise.resolve(
      request
        .toPromise()
        .then(_success_callback)
        .catch((error) => { 
          console.log(module + ' error ', error);
          let _errors: any[] = this.convertErrorMessages(error);
          return { success: false, errors: _errors };
        })
    );
  }

  private convertErrorMessages(objs) { 
    let arr = []; 
    if(objs && objs.error && objs.error.message ){ 
      arr.push(objs.error.message);
    }else{ 
      let errors = objs.errors ? objs.errors : objs.message;
      for (let key in errors) {
        let msg: string = errors[key][0];
        msg = msg.replace('must be a string', 'is required');
        arr.push({ field: key, message: msg });
      }
    }

    return arr;
  }
}
