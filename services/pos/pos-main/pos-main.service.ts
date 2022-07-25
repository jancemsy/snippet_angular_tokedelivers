import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class PosMainService {

  private _posPaymentMode$ = new BehaviorSubject<string>('menu');
  private posPaymentMode$ = this._posPaymentMode$.asObservable();

  private _posDebitPaymentStatus$ = new BehaviorSubject<string>('waiting');
  private posDebitPaymentStatus$ = this._posDebitPaymentStatus$.asObservable();

  private _currentProduct$ = new BehaviorSubject<IProduct>(null);

  constructor() { }

  get getCurrentProduct(): Observable<IProduct> {
    return this._currentProduct$;
  }

  get posPaymentMode() : Observable<string>{
    return this.posPaymentMode$;
  }

  get posDebitPaymentStatus() : Observable<string>{
    return this.posDebitPaymentStatus$;
  }

  setPosDebitPaymentStatus(status : string){
    this._posDebitPaymentStatus$.next(status);
  }

  setPosPaymentMode(mode : string){
    this._posPaymentMode$.next(mode);
  }

  setCurrentProduct(product: any) {
    this._currentProduct$.next(product);
  }
}
