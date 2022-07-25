import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PD_DEFINE_GET_OFF, PD_DEFINE_GET_PRODUCT } from 'src/app/@core/constants/forms/definition-percentage-discounts';
import { PromoConfig } from 'src/app/models';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { MainFormStateService } from '../../main/main-form-state.service';
import { ProductDataService } from '../../webstore/product/product-data.service';

@Injectable({
  providedIn: 'root'
})
export class PercentageDiscountStateService extends MainFormStateService {

  protected _title = "Percentage Discount";

  private _previewBuilder: Object = { init: "Get " };
  public previewMsg: string = '';

  constructor(_productDataService: ProductDataService, localStorage: LocalStorageService) {
    super(
      new BehaviorSubject<PromoConfig>(null),
      _productDataService,
      localStorage
    );
  }



  // GETTERS -------------------------------------------------------------------------
  public get getConfig(): Observable<any> {
    return this._config$;
  }

  // SETTERS -------------------------------------------------------------------------
  public reset() {
    this._config$.next({
      id : null,
      companyId : 1,
      name : '',
      avatar : '',
      description : '',
      code : '',
      type : { abbr: 'pd' },
      definitionConfig : { definitions: [] },
      timingLocationConfig : {
        startDate: '',
        endDate: '',
        dispensaries: [],
        specificTimeStart: null,
        specificTimeEnd: null,
        specificDays: []
      },
      otherSettingsConfig : {
        usagePerCustomerMax : null,
        totalUsageLimit : null,
        promoStackGroup : null,
        chargeType : null,
        customerGroups : null,
      },
    });
    this.setStateActiveStep(0);

    // Others
    this._previewBuilder[PD_DEFINE_GET_OFF] = "___%";
    this._previewBuilder[PD_DEFINE_GET_PRODUCT] = " off ____.";
    this.handlePreview(null, null);
  }

  public setStateConfig(_config: PromoConfig) {
    this._config$.next(_config);
  }

  /**
   * This function handles the preview message based from the keyflow, item, and builder
   * @param keyflow
   * @param item
   */
  public handlePreview(keyflow: string, item: any) {
    this.previewMsg = "";

    switch(keyflow) {
      case PD_DEFINE_GET_OFF:
        this._previewBuilder[PD_DEFINE_GET_OFF] = item.value + "%";
        break;
      case PD_DEFINE_GET_PRODUCT:
        let getProduct = this.getDefinitionLabelConfig(PD_DEFINE_GET_PRODUCT);
        this._previewBuilder[PD_DEFINE_GET_PRODUCT] = " off " + getProduct + ".";
        break;
    }

    // now we need to render preview after builder above
    Object.keys(this._previewBuilder).forEach(index => {
      this.previewMsg += this._previewBuilder[index]
    });

  }

}
