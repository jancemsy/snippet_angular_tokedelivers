import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentOption } from 'src/app/models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewaysService {
  apiBase = environment.apiBase;
  customerPaymentOptions: PaymentOption[];
  customerInfo: any;

  constructor(
    private _http: HttpClient,
  ) { }

  getPaymentGateways() {
    return this._http.get(`${this.apiBase}/v1/gateway`);
  }

  getCustomerPaymentMethods() {
    return this._http.get(`${this.apiBase}/v1/customer/payment_methods`);
  }

  addPaymentMethod(data: PaymentOption) {
    return this._http.post(`${this.apiBase}/v1/customer/add/payment_method`, data);
  }

  removePaymentMethod(id: number | string)  {
    return this._http.post(`${this.apiBase}/v1/customer/delete/payment_method`, { id });
  }
}
