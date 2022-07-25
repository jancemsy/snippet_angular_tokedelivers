import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DD_DEFINE_GET_OFF, DD_DEFINE_GET_PRODUCT } from 'src/app/@core/constants/forms/definition-dollar-discount';
import { PromoConfig } from 'src/app/models';
import { MainFormStateService } from 'src/app/services/state-management/main/main-form-state.service'
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { ProductDataService } from '../../webstore/product/product-data.service';

@Injectable({
  providedIn: 'root'
})
export class DollarDiscountStateService extends MainFormStateService {

  protected _title = "Dollar Discount";
  public previewMsg: string = '';
  private _previewBuilder: Object = {
    init: "GET ",
  };

  constructor(_productDataService: ProductDataService, _localStorage: LocalStorageService) {
    super(
      new BehaviorSubject<PromoConfig>(null),
      _productDataService,
      _localStorage
    );
  }

  // OVERRIDE GETTERS -------------------------------------------------------------------------
  public get getConfig(): Observable<PromoConfig> {
    return this._config$.asObservable();
  }

  // OVERRIDE SETTERS -------------------------------------------------------------------------
  public reset() {
    this._config$.next({
      id : 0,
      companyId : 1,
      name : '',
      avatar : '',
      description : '',
      code : '',
      type : { abbr: 'dd' },
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
    this._previewBuilder[DD_DEFINE_GET_OFF] = "$___";
    this._previewBuilder[DD_DEFINE_GET_PRODUCT] = " off ____.";
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

    if (keyflow == DD_DEFINE_GET_OFF && item) {
      this._previewBuilder[DD_DEFINE_GET_OFF] = "$" + item.value;
    }

    if (keyflow == DD_DEFINE_GET_PRODUCT && item) {
      let text = this.getDefinitionLabelConfig(DD_DEFINE_GET_PRODUCT);
      this._previewBuilder[DD_DEFINE_GET_PRODUCT] = " off " + text + ".";
    }

    // now we need to render preview after builder above
    Object.keys(this._previewBuilder).forEach(index => {
      this.previewMsg += this._previewBuilder[index]
    });
  }

}
