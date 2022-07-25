import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PosAlert } from 'src/app/models/pos/pos-alert.model';
import { PosScanner } from 'src/app/models/pos/pos-scanner';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { LocalStorageService } from '../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {

  private _posMode$ = new BehaviorSubject<string>('lockscreen');
  private posMode$ = this._posMode$.asObservable();

  private _isTransactionComplete$ = new BehaviorSubject<boolean>(false);
  private isTransactionComplete$ = this._isTransactionComplete$.asObservable();

  private _posScanner$ = new BehaviorSubject<PosScanner>(null);
  private _posAlert$ = new BehaviorSubject<PosAlert>({
    activate: false,
    message: '',
    icon: ''
  });

  apiBase = environment.apiBase;


  constructor(
    private _api : ApiService,
    private _localStorageService: LocalStorageService,
  ) {
    let unlocked = _localStorageService.retrieveItem('pos_unlocked');
    if (unlocked) {
      this._posMode$.next('register');
    }
  }

  get isTransactionComplete() : Observable<boolean>{
    return this.isTransactionComplete$;
  }

  get posMode() : Observable<string>{
    return this.posMode$;
  }

  get posAlert() : Observable<PosAlert> {
    return this._posAlert$.asObservable();
  }

  get posScanner(): Observable<PosScanner> {
    return this._posScanner$.asObservable();
  }

  unlockPos() {
    this._localStorageService.storeLocal('pos_unlocked', true);
    this._posMode$.next('register');
  }

  setPosMode(mode : string){
    this._posMode$.next(mode);
  }

  setTransactionComplete(status : boolean){
    this._isTransactionComplete$.next(status);
  }

  setPosAlert(alert: PosAlert) {
    this._posAlert$.next(alert);
  }

  setPosScanner(scanner: PosScanner) {
    this._posScanner$.next(scanner);
  }

  addOrder(data : any){
    console.log("ORDER", data);
    console.log("BASE",  this.apiBase);
    return this._api.post(`/pos/create/order`, data);
  }

  prepareOrder(cartItems : any, cartSummary : any, payment : any){
    let data = {
      items : [],
      payment_method : payment.method,
      amount : parseFloat(payment.amount.toFixed(2)),
      subtotal : parseFloat(cartSummary.subTotal.toFixed(2)),
      discounts : parseFloat(cartSummary.discount.toFixed(2)),
      sales_tax : parseFloat(cartSummary.salesTax.toFixed(2)),
      total : parseFloat(cartSummary.total.toFixed(2)),
      total_quantity : 0,
    };

    cartItems.forEach(cartItem => {
        data.items.push({
          product_id : cartItem.id,
          variant_id : cartItem.variant_id,
          quantity : cartItem.quantity,
          sku : cartItem.package.sku,
          price : cartItem.price,
        })
        data.total_quantity += cartItem.quantity;
    });

    return data;
  }



  // Pos customer api service
  customers(params: any) {
    return this._api.get('/pos/customer/list', { params: params });
  }


}
