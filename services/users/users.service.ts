import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
    private _api: ApiService
  ) {}

  getUserRoles() {
    return this._http.get(`${this.apiBase}/v1/roles`);
  }

  createUserAddress(data: any) {
    return this._http.post(`${this.apiBase}/v1/user/address/create`, data);
  }

  updateUserAddress(data: any) {
    return this._http.post(`${this.apiBase}/v1/user/address/update`, data);
  }
  
  deleteUserAddress(data: any) {
    return this._http.post(`${this.apiBase}/v1/user/address/delete`, data);
  }

  changeUserPassword(data: any) {
    return this._api.post('/user/password/change', data);
  }
}
