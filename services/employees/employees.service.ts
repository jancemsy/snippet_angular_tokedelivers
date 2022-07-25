import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService
  ) { }

  getEmployeesList() {
    const { user_company_id } = this._localStorage.retrieveItem('loginInfo');

    return this._http.get(`${this.apiBase}/v1/company/${user_company_id}/employees`)
  }
}
