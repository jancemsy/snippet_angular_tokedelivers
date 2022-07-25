import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DiscountSettingsNavItem } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DiscountPromoSettingsStateService {

  private _title$ = new BehaviorSubject<string>('Discount/Promos Settings');
  private title$ = this._title$.asObservable();

  private _slugStack$ = new BehaviorSubject<string[]>(['settings']);
  private slugStack$ = this._slugStack$.asObservable();

  private _discountSettingsNavItems$ = new BehaviorSubject<DiscountSettingsNavItem[]>([]);
  private discountSettingsNavItems$ = this._discountSettingsNavItems$.asObservable();

  private _editModeFor$ = new BehaviorSubject<string>(null);

  constructor() {
    this.resetConfigItems();
  }

  get title() : Observable<string>{
    return this.title$;
  }
  get slugStack() : Observable<string[]>{
    return this.slugStack$;
  }

  get discountSettingsNavItems() : Observable<DiscountSettingsNavItem[]>{
    return this.discountSettingsNavItems$;
  }

  get editModeFor() : Observable<string> {
    return this._editModeFor$.asObservable();
  }


  setSlugStack(slugStack : string[]){
    this._slugStack$.next(slugStack);
  }

  pushSlug(slug : string){
    let slugStackArray = this._slugStack$.value;

    slugStackArray.push(slug);

    this._slugStack$.next(slugStackArray);
  }

  popSlug(){
    let slugStackArray = this._slugStack$.value;

    slugStackArray.pop();

    this._slugStack$.next(slugStackArray);

    if (slugStackArray.length > 0) {
      switch (slugStackArray[slugStackArray.length - 1]) {
        case 'discount-limits':
          this.setTitle('Discount Limits');
          break;
        case 'discount-groups':
          this.setTitle('Discount Groups');
          break;
      }
    }
  }

  setTitle(title : string){
    this._title$.next(title);
  }

  setDiscountSettingsNavItems(configItems : DiscountSettingsNavItem[]){
    this._discountSettingsNavItems$.next(configItems);
  }

  resetConfigItems(){
    const navItems: DiscountSettingsNavItem[] = [
      {
        title : 'Discount Limits',
        icon : 'assets/icons/DiscountLimits.svg',
        slug: 'discount-limits' ,
      },
      {
        title : 'Discount Groups',
        icon : 'assets/icons/DiscountGroups.svg',
        slug: 'discount-groups' ,
      },

    ];

    this.setDiscountSettingsNavItems(navItems);
  }

  reset(){
    this.setTitle('Discount/Promos Settings');
    this.setSlugStack(['settings']);
    this.resetEditMode();
  }

  resetEditMode() {
    this._editModeFor$.next(null);
  }

  // This function to activate title for editing dc group name in the title
  onEditDCGroupName() {
    this._editModeFor$.next('dc_group_name');
  }

  onEditDCGroupList() {
    this._editModeFor$.next('dc_group_list');
  }
}
