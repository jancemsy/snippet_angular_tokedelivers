import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PosCartItem, PosCartSummary} from 'src/app/models';
import { LocalStorageService } from '../../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PosSideService {
  private _cartItems$ = new BehaviorSubject<PosCartItem[]>([]);
  private cartItems$ = this._cartItems$.asObservable();

  private _cartSummary$ = new BehaviorSubject<PosCartSummary>({subTotal : 0, discount : 0, salesTax : 0, total : 0});
  private cartSummary$ = this._cartSummary$.asObservable();

  private _posChange$ = new BehaviorSubject<number>(0);
  private posChange$ = this._posChange$.asObservable();
  private _posOrderNumber$ = new BehaviorSubject<string>('123456');
  private posOrderNumber$ = this._posOrderNumber$.asObservable();
  private _posPromoCodes$ = new BehaviorSubject<string[]>([]);

  constructor(
    private _localStorage: LocalStorageService,
    ) {
      let cartItems = this._localStorage.retrieveItem('posCart');
      if(cartItems){
        this._cartItems$.next(cartItems);
      }
   }

  get cartItems(): Observable<PosCartItem[]> {
    return this.cartItems$;
  }

  get posChange(): Observable<number> {
    return this.posChange$;
  }

  get posOrderNumber(): Observable<string> {
    return this.posOrderNumber$;
  }

  get cartSummary(): Observable<PosCartSummary> {
    return this.cartSummary$;
  }

  get getPromoCodes(): Observable<string[]> {
    return this._posPromoCodes$.asObservable();
  }

  resetCartItems(){
    this._cartItems$.next([]);
    this._localStorage.storeLocal('posCart',this._cartItems$.value);
  }

  addCartItem(cartItem : PosCartItem){
    let cartItemArray = this._cartItems$.value;
    let cartItemUnique = true;

    cartItemArray.forEach((item, index) => {
        if(item.id == cartItem.id && item.variant_id == cartItem.variant_id){
          cartItemArray[index].quantity++;
          cartItemUnique = false;
        }
    });

    if(cartItemUnique){
      this._cartItems$.next([...this._cartItems$.value, cartItem]);
      this._localStorage.storeLocal('posCart',this._cartItems$.value);
    }else{
      this._cartItems$.next(cartItemArray);
      this._localStorage.storeLocal('posCart',this._cartItems$.value);
    }
  }

  removeCartItem(index: number) {
    let cartItemArray = this._cartItems$.value;
    cartItemArray.splice(index, 1);

    this._cartItems$.next(cartItemArray);
    this._localStorage.storeLocal('posCart',this._cartItems$.value);
  }

  updateCartItem(index: number, cartItem : PosCartItem) {
    let cartItemArray = this._cartItems$.value;
    cartItemArray[index] = cartItem;

    this._cartItems$.next(cartItemArray);
    this._localStorage.storeLocal('posCart',this._cartItems$.value);
  }

  refreshCartSummary(){

    let cartItemArray = this._cartItems$.value;
    let cartSummaryArray = this._cartSummary$.value;

    cartSummaryArray.subTotal = 0;

    cartItemArray.forEach(item => {
      cartSummaryArray.subTotal += item.price * item.quantity;
    });

    cartSummaryArray.discount = 0;
    cartSummaryArray.salesTax = cartSummaryArray.subTotal * 0.2;
    cartSummaryArray.total = cartSummaryArray.subTotal + cartSummaryArray.discount + cartSummaryArray.salesTax;

    this._cartSummary$.next(cartSummaryArray);
  }

  setPosChange(posChange : number){
    this._posChange$.next(posChange);
  }

  setPosOrderNumber(posOrderNumber : string){
    this._posOrderNumber$.next(posOrderNumber);
  }

  addPromoCode(promoCode: string) {
    const { value } = this._posPromoCodes$;

    value.push(promoCode);
    this._posPromoCodes$.next(value);
  }

}
