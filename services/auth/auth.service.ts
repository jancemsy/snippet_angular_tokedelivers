import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ILoginInfo, ISignUpInfo, IFinalRegData, IRegFinalStepData } from '../../models';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiBase = environment.apiBase;

  constructor(
    private _localStorage: LocalStorageService,
    private _http: HttpClient,
  ) { }

  get signupHttpHeader() { // TODO: put this into an interceptor
    const { access_token } = this._localStorage.retrieveItem('signInInfo');
    return {
      Authorization: `Bearer ${access_token}`
    };
  }

  // TODO: move this to signup service
  signup(creds: ISignUpInfo) { // for both dispensary and cannabis user
    return this._http.post(`${this.apiBase}/v1/registration/partial/new`, creds);
  }

  register(finalData: IRegFinalStepData | IFinalRegData | any): Observable<any> {
    const headers = new HttpHeaders(this.signupHttpHeader);

    // TODO: remove this commented section
    // once we have fully worked out file uploading
    // -----------------
    // const path = `${this.apiBase}/v1/registration/dispensary/new`;
    // return this.createFormDataPayload(finalData, rawFiles, path, headers);
    // -----------------

    return this._http.post(`${this.apiBase}/v1/registration/dispensary/new`, finalData, { headers });
  }

  registerCannabisUser(userInfo: any) {
    const headers = new HttpHeaders(this.signupHttpHeader);
    return this._http.post(`${this.apiBase}/v1/registration/customer/new`, userInfo, { headers });
  }

  // ----

  signIn(creds: ILoginInfo) {
    return this._http.post(`${this.apiBase}/v1/login`, creds);
  }

  logout() {
    return this._http.get(`${this.apiBase}/v1/logout`);
  }

  requestResetPassword(email) {
    return this._http.post(`${this.apiBase}/v1/password/reset`, { email });
  }

  resetPassword(token) {
    return this._http.post(`${this.apiBase}/v1/password/validate/token`,  {token});
  }

  changePassword(token , email, password) {
    return this._http.post(`${this.apiBase}/v1/password/change`,  {token, email, password});
  }

  // TODO: transfer to utilities
  createFormDataPayload(dataObj: any, rawFiles: File[], path: string, headers): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('formData', dataObj);

    if (rawFiles && rawFiles.length) {
      rawFiles.forEach((file: any) => {
        const key = Object.keys(file);
        formData.append(key[0], file[key[0]]);
      });
    }

    const req = new HttpRequest('POST', `${path}`, formData, { headers });

    return this._http.request(req);
  }

}
