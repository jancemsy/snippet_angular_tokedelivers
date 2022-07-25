import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoCardConfig } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AddLoyaltyStateService {

  private _title$ = new BehaviorSubject<string>('Loyalty Offers');
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
        title : 'Points & Tiers Rule',
        icon : '',
        slug: 'points-tiers-rule' , 
        parentSlug: 'loyalty-offers', 
        description : 'Determine which actions and events allow customers to accumulate points or upgrade/downgrade their status.',
      },
      { 
        title : 'Loyalty Reward',
        icon : '',
        slug: 'loyalty-reward' , 
        parentSlug: 'loyalty-offers', 
        description : 'Create rewards where customers can cash in on their points.',
      },
    ];

    this.setInfoCardConfigItems(configItems);
  }

  reset(){
    this.setTitle('Loyalty Offers');
    this.setActiveSlug('');
  }
}
