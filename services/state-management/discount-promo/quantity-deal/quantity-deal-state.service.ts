import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PromoConfig, SelectMulti } from 'src/app/models';
import { MainFormStateService } from 'src/app/services/state-management/main/main-form-state.service'
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { ProductDataService } from '../../webstore/product/product-data.service';
import { QD_DEFINE_BUY, QD_DEFINE_BUY_WORTH, QD_DEFINE_FOR_FROM, QD_DEFINE_FOR_TO, QD_DEFINE_FOR_TO_TYPE, QD_DEFINE_GET_FROM, QD_DEFINE_GET_TO } from 'src/app/@core/constants/forms/definition-quantity-deals'

@Injectable({
  providedIn: 'root'
})
export class QuantityDealStateService extends MainFormStateService {

  protected _title = "Quantity Deal";
  public previewMsg: string = '';
  private _previewBuilder: Object;

  constructor(_productDataService: ProductDataService, _localStorage: LocalStorageService) {
    super(
      new BehaviorSubject<PromoConfig>(null),
      _productDataService,
      _localStorage
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
      type : { abbr: 'qd' },
      definitionConfig : {
        definitions: []
      },
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
    this._previewBuilder = {
      0: "Buy "
    };
  }

  public setStateConfig(_config: PromoConfig) {
    this._config$.next(_config);
  }


  public getBuyOptions(): Array<SelectMulti> {
    return [
      { value: '$', text: 'Dollar amount' },
      { value: '#', text: 'Number of items' },
    ];
  }

  public getSelectForType() {
    var forType = this.getDefinitionConfigs(QD_DEFINE_FOR_TO_TYPE);
    let select = null;
    switch (forType) {
      case '$': select = {text: '$', value: '$'}; break;
      case 'fixed$': select = {text: '$', value: 'fixed$'}; break;
      case 'fixed%': select = {text: '%', value: 'fixed%'}; break;
      case 'free': select = {text: 'Free', value: 'free'}; break;
    }

    return select;
  }

  public getForOptions(): Array<SelectMulti> {
    return [
      { value: '$', text: 'Dollar amount' },
      { value: 'fixed$', text: 'Fixed $ off ' },
      { value: 'fixed%', text: 'Fixed % off ' },
      { value: 'free', text: 'Free ' },
    ];
  }

  public handlePlaceHolder(key: string): string {
    let placeholder = '';
    switch (key) {
      case 'worth_of':
        var value = this.getDefinitionConfigs(QD_DEFINE_BUY);
        placeholder = value == '$' ? 'Enter dollar amount' : 'Enter number';
        break;
      case 'for_to':
        var value = this.getDefinitionConfigs(QD_DEFINE_FOR_TO_TYPE);
        var patterns = {
          '$': 'Enter dollar value',
          'fixed$': 'Enter dollar value',
          'fixed%': 'Enter percentage',
        }
        placeholder = patterns[value];
        break;
    }

    return placeholder;
  }

  public showLabel(key: string): string {
    let label = "";
    switch (key) {
      case 'worth_of':
        var value = this.getDefinitionConfigs(QD_DEFINE_BUY);
        label = value == '$' ? 'worth of' : '';
        break;
      case 'for_type':
        var forType = this.getDefinitionConfigs(QD_DEFINE_FOR_TO_TYPE);
        if (forType == '$') {
          label = '$';
        } else {
          var option = this.getForOptions().find(opt => opt.value == forType)
          label = option ? option.text : '';
        }
        break;
    }

    return label;
  }

  /**
   * This function handles the preview message based from the keyflow, item, and builder
   * @param keyflow
   * @param item
   */
  public handlePreview(keyflow: string, item: any) {
    this.previewMsg = "";


    switch (keyflow) {

      case QD_DEFINE_BUY:
        this._previewBuilder[1] = item.value == '$' ? item.value : '';
        this._previewBuilder[2] = "____ ";
        this._previewBuilder[2] += item.value == '$' ? " worth of" : '';
        break;

      case QD_DEFINE_BUY_WORTH:
        let worthOf = this._previewBuilder[1] == '$' ? 'worth of ' : '';
        this._previewBuilder[2] = " " + item.value + " " + worthOf;
        break;

      case QD_DEFINE_GET_FROM:
        let getFrom = this.getDefinitionLabelConfig(QD_DEFINE_GET_FROM);
        this._previewBuilder[3] = getFrom + ", get ";
        this._previewBuilder[4] = '___';
        break;

      case QD_DEFINE_GET_TO:
        this._previewBuilder[4] = item.value;
        break;

      case QD_DEFINE_FOR_FROM:
        let forFrom = this.getDefinitionLabelConfig(QD_DEFINE_FOR_FROM);
        this._previewBuilder[5] = " "  + forFrom + " for ";
        break;

      case QD_DEFINE_FOR_TO_TYPE:
        switch (item.value) {
          case '$':
            this._previewBuilder[6] = "$";
            this._previewBuilder[7] = "___.";
            break;
          case 'fixed$':
            this._previewBuilder[6] = "fixed ";
            this._previewBuilder[7] = "$___ off.";
            break;
          case 'fixed%':
            this._previewBuilder[6] = "fixed ";
            this._previewBuilder[7] = "%___ off.";
            break;
          case 'free':
            this._previewBuilder[6] = "";
            this._previewBuilder[7] = "free.";
            break;
        }
        break;

      case QD_DEFINE_FOR_TO:
        if (item && item.value && this._previewBuilder[7]) {
          let forTo = this._previewBuilder[7].replace('___', item.value);
          this._previewBuilder[7] = forTo;
        }
        break;
    }

    // now we need to render preview after builder above
    Object.keys(this._previewBuilder).forEach(index => {
      this.previewMsg += this._previewBuilder[index]
    });

  }

}
