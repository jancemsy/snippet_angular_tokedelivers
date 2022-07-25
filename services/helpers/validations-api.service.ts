import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationsApiService {
  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
  ) { }

  checkEmailExists(email: string) {
    return this._http.post(`${this.apiBase}/v1/user/validate/email`, { email });
  }

  checkLegalNameExists(legal_company_name: string) {
    return this._http.post(`${this.apiBase}/v1/company/validate/name`, { legal_company_name });
  }

}
