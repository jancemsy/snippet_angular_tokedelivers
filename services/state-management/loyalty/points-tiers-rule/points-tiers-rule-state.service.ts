import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoyaltyConfig } from 'src/app/models';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { MainFormStateService } from '../../main/main-form-state.service';
import { ProductDataService } from '../../webstore/product/product-data.service';

@Injectable({
  providedIn: 'root'
})
export class PointsTiersRuleStateService extends MainFormStateService {

  protected _title = "Points & Tiers Rule";

  constructor(_productDataService: ProductDataService, _localStorage: LocalStorageService) {
    super(new BehaviorSubject<LoyaltyConfig>(null), _productDataService, _localStorage);
  }

  // GETTERS -------------------------------------------------------------------------
  public get getConfig(): Observable<any> {
    return this._config$.asObservable();
  }

  // SETTERS -------------------------------------------------------------------------
  public reset() {
    this._config$.next({
      id : null,
      name : '',
      companyId : 1,
      description : '',
      type : { abbr : 'ptr'},
      definitionConfig : { definitions: [] },
      timingLocationConfig : {
        startDate: '',
        endDate: '',
        dispensaries: [],
        specificTimeStart: null,
        specificTimeEnd: null,
        specificDays: []
      },
    });
    this.setStateActiveStep(0);
  }

  public setStateConfig(_config: LoyaltyConfig) {
    this._config$.next(_config);
  }


  // OVERRIDE NAVIGATION STEPS
  protected onNavigate(_step: number) {
    switch (_step) {

      case 1:
        this._activePhase$.next({
          step: 1,
          layout: 'detail',
          title: this._title,
          navigation: false,
          info: 'Define the terms of the deal below. A preview will populate as you fill it out.',
          nav_button: 'Next',
          nav_next: false,
        });
        break;

      case 2:
        this._activePhase$.next({
          step: 2,
          layout: 'detail',
          title: this._title,
          navigation: true,
          info: '',
          nav_button: 'Finish',
          nav_next: true,
        });
        break;
    }
  }

  public setEditItem(_item: any) {
    // this.item = _item;

    // TODO Handle the item data here
  }
}
