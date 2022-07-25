import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private api: ApiService
  ) { }

  getCompanyProducts(id, page) // Company ID; Pagination page number
  {
    return this.api.get(`/company/${id}/products?page=${page}`);
  }

  deleteCompanyProduct(id)
  {
    return this.api.delete(`/company/product/${id}/delete`);
  }

  search(body)
  {
    return this.api.post(`/company/product/search`, body);
  }

  getProductsByDispensary(id) {
    return this.api.get(`/dispensary/${id}/products`);
  }
}
