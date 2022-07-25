import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiBase = environment.apiBase;

  constructor(
    private _http: HttpClient,
  ) { }

  // GET /api/v1/company/product/{product_id}/batches
  getCompanyProductBatches(productId: number) {
    return this._http.get(`${this.apiBase}/v1/company/product/` + productId + `/batches`);
  }

  // POST /api/v1/company/product/batch/update
  updateCompanyProductBatch(data: any) {
    return this._http.post(`${this.apiBase}/v1/company/product/batch/update`, data);
  }

  // POST /api/v1/company/product/batch/{product_id}/delete
  depleteCompanyProductBatch(productId: number, data: any) {
    return this._http.post(`${this.apiBase}/v1/company/product/batch/` + productId + `/delete`, data);
  }

  // POST /api/v1/company/validate/name
  validateCompanyName(data: any) {
    return this._http.post(`${this.apiBase}/v1/company/validate/name`, data);
  }

  // GET /api/v1/company/{company_id}/dispensaries
  getComapnyDispensaries(compId: number) {
    return this._http.get(`${this.apiBase}/v1/company/` + compId + `/dispensaries`);
  }

  // GET /api/v1/company/{company_id}/customer/group/list
  getCompanyCustomerGroups(compId: number) {
    return this._http.get(`${this.apiBase}/v1/company/` + compId + `/customer/group/list`);
  }

  // GET /api/v1/company/{company_id}/products
  getCompanyProducts(compId: number) {
    return this._http.get(`${this.apiBase}/v1/company/` + compId + `/products`);
  }

  // GET /api/v1/company/product/{product_id}/get
  getCompanyProduct(prodId: number) {
    return this._http.get(`${this.apiBase}/v1/company/product/` + prodId + `/get`);
  }
}
