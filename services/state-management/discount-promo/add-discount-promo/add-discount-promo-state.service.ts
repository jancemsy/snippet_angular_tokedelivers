import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoCardConfig } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AddDiscountPromoStateService {

  private _title$ = new BehaviorSubject<string>('Deal or Discount');
  private title$ = this._title$.asObservable();

  private _activeSlug$ = new BehaviorSubject<string>('');
  private activeSlug$ = this._activeSlug$.asObservable();


  private _infoCardConfigItems$ = new BehaviorSubject<InfoCardConfig[]>([]);
  private infoCardConfigItems$ = this._infoCardConfigItems$.asObservable();

  constructor() {
    this.resetConfigItems();
  }
  get activeSlug() : Observable<string>{
    return this.activeSlug$;
  }

  get infoCardConfigItems() : Observable<InfoCardConfig[]>{
    return this.infoCardConfigItems$;
  }

  get title() : Observable<string>{
    return this.title$;
  }

  setActiveSlug(activeSlug : string){
    this._activeSlug$.next(activeSlug);
  }

  setInfoCardConfigItems(configItems : InfoCardConfig[]){
    this._infoCardConfigItems$.next(configItems);
  }

  setTitle(title : string){
    this._title$.next(title);
  }
  
  resetConfigItems(){
    const configItems: InfoCardConfig[] = [
      {
        title : 'Dollar Discount',
        icon : 'assets/icons/DollarDiscount.svg',
        slug: 'dollar-discount' ,
        parentSlug: 'deal-or-discount',
        description : 'Create a fixed dollar discount (i.e. $10 off all Sativa Pre-Rolls)',
      },
      {
        title : 'Percentage Discount',
        icon : 'assets/icons/PercentageDiscount.svg',
        slug: 'percentage-discount' ,
        parentSlug: 'deal-or-discount',
        description : 'Create a fixed percentage discount (i.e. 10% off all balms and lotions)',
      },
      {
        title : 'Quantity Deal',
        icon : 'assets/icons/QuantityDeal.svg',
        slug: 'quantity-deal' ,
        parentSlug: 'deal-or-discount',
        description : 'Customize your own quantity deal (i.e. Buy 2 cartridges, get any vape 10% off)',
      },

    ];

    this.setInfoCardConfigItems(configItems);
  }

  reset(){
    this.setTitle('Deal or Discount');
    this.setActiveSlug('');
  }
}
