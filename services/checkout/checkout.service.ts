import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(
    private apiService: ApiService
  ) { }

  getCheckoutPageData()
  {
    return this.apiService.get('/order/checkout');
  }

  updateCartItem(body)
  {
    return this.apiService.put('/cart/item/update', body);
  }

  deleteCartItem(id)
  {
    let body = {
      cart_item_id: id
    };
    return this.apiService.post('/cart/item/remove', body);
  }

  placeOrder(body)
  {
    return this.apiService.post('/order/place', body);
  }

  emptyCart(id)
  {
    let body = {
      cart_id: id
    };
    return this.apiService.post('/cart/empty', body);
  }

  saveLocalCartItems(body)
  {
    return this.apiService.post('/cart/item/add/multiple', body);
  }

  verifyPromoCode(body)
  {
    return this.apiService.post('/promos/code/verify', body);
  }

  getDiscounts()
  {
    return this.apiService.get('/cart/discounts/applied');
  }

  getLoyalties()
  {
    return this.apiService.get('/company/reward/discounts/get');
  }
}
