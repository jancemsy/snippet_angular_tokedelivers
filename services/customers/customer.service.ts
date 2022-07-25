import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/app/models/customer/customer.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiBase = environment.apiBase;

  constructor(private _http: HttpClient) {}

  getCustomers() {}

  getCustomer(id: number) {
    return this._http.get(`${this.apiBase}/v1/customer/${id}/get`);
  }

  updateCustomer(data: Customer) {
    return this._http.post(`${this.apiBase}/v1/customer/update`, data);
  }

  getOrders(customer_id) {
    return this._http.get(`${this.apiBase}/v1/order/history`);
  }

}
