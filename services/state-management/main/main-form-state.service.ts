import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtherSettingsConfig, SelectMulti, TimingLocationConfig } from 'src/app/models';
import { ProductDataService } from '../webstore/product/product-data.service';
import { LocalStorageService } from '../../utilities/local-storage.service';
import { STATE } from '../webstore';

@Injectable({
  providedIn: 'root'
})
export abstract class MainFormStateService {

  // We need to create a common state service handler for loyalty, discounts and promo deals
  // IMPORTANT NOTES :
  // 1. Navigational Step - this will handle the navigation throughout quantity deal only
  // 2. Temporary Data Store - this will keep all the information throughout the state
  // 3. Abstract methods - these are necessary common methods that will be use in different state

  private _filterChoices$ = new BehaviorSubject<SelectMulti[]>([]);
  protected _activeStep$ = new BehaviorSubject<number>(0);
  protected _activePhase$ = new BehaviorSubject<any>({});
  protected editmode: boolean = false;

  protected _title: string = '';

  // ABSTRACT METHODS ---------------------------------------------------------------
  public abstract get getConfig(): Observable<any>;
  public abstract reset() : void;
  public abstract setStateConfig(_config: any) : void;

  // GETTERS -------------------------------------------------------------------------
  public get getActivePhase(): Observable<any> {
    return this._activePhase$.asObservable();
  }

  public get getFilterChoices() : Observable<SelectMulti[]> {
    return this._filterChoices$.asObservable();
  }

  protected _config$: BehaviorSubject<any>;

  constructor(
    config: BehaviorSubject<any>,
    private _productDataService: ProductDataService,
    private _localStorage: LocalStorageService
  ) {
    this._config$ = config;
  }

  public init() {
    this.reset();
    this.prepareFilterChoices();

    let initialStep = this.editmode ? 1 : 0;
    this.setStateActiveStep(initialStep);
    this.editmode = false;

    // Add more initialization here in the future
  }

  public prepareFilterChoices() {

    // TODO get all the choices from API here

    let result = this._localStorage.retrieveItem(STATE.ON_RESULT_GET_PRODUCT_SIDEBAR);

    // if chache exist :
    if (result) {
      console.log("productDataService", result);
      let mapped = this.mapFilter(result);
      this._filterChoices$.next(mapped);
    } else {
      this._productDataService.get_sidebar().then(result =>{
        if(result.success) {
          let mapped = this.mapFilter(result.data);
          this._filterChoices$.next(mapped);
          this._localStorage.storeLocal(STATE.ON_RESULT_GET_PRODUCT_SIDEBAR, result.data);
        }
      });
    }
  }

  // This will handle the mapping for the product filter
  private mapFilter(data: any): Array<SelectMulti> {
    let catIndex = data.findIndex(item => item.category_name == 'Category');
    let strainIndex = data.findIndex(item => item.category_name == 'Strain');
    let brandIndex = data.findIndex(item => item.category_name == 'Brand');
    let mapped = [
      { text: 'Category', children: data[catIndex].category_items.map(item => ({ value: item.key + '-category', text: item.name }) ) },
      { text: 'Strain', children: data[strainIndex].category_items.map(item => ({ value: item.key + '-strain', text: item.name }) ) },
      { text: 'Brand', children: data[brandIndex].category_items.map(item => ({ value: item.key + '-brand', text: item.name }) ) },
      { text: 'Specific Product', value: 'specific-product' },
      { text: 'Any Product', value: 'any' },
    ];
    return mapped;
  }

  public setStateActiveStep(_step: number) {
    this._activeStep$.next(_step);
    this.onNavigate(_step);
  }

  public setStateStepValidForm(valid: boolean) {
    // TODO step valid form
    let phase = this._activePhase$.value;
    phase.nav_next = valid;
    this._activePhase$.next(phase);
  }

  public setEditMode(enable: boolean) {
    this.editmode = enable;
  }

  // NAVIGATION STEPS
  // step 1. add image, name, and promo code
  // step 2. deal definitions, this phase will have the user fill in the deal conditions
  // step 3. Timing & Locations, when will the deal starts and end. This will have locations too
  // step 4. Other settings, this where all other settings will be fill in.

  // TODO Navigation for the steps, (will improve in the future)
  protected onNavigate(_step: number) {
    switch (_step) {

      case 0:
        this._activePhase$.next({
          step: 0,
          layout: 'empty',
          title: '',
          navigation: false,
          info: '',
          nav_button: 'Next',
          nav_next: false,
        });
        break;

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
          nav_button: 'Next',
          nav_next: false,
        });
        break;

      case 3:
        this._activePhase$.next({
          step: 3,
          layout: 'detail',
          title: this._title,
          navigation: true,
          info: '',
          nav_button: 'Finish',
          nav_next: false,
        });
        break;
    }
  }


  // PUBLIC METHODS ---------------------------------------------------------------------------
  public setDefinitionConfigs(key: string, value: any, text?: string) {
    let definitions = [];

    let promoConfig = this._config$.value;

    // check if definitionConfig is not empty
    if (promoConfig.definitionConfig) {
      definitions = promoConfig.definitionConfig.definitions;
      let index = definitions.findIndex(def => def.key == key);

      // if key already exist, then update value
      if (index >= 0) {
        definitions[index].value = value;
        definitions[index].text = text;

      // otherwise push
      } else {
        definitions.push({ key, value, text});
      }

    // add initial key value to definitions
    } else {
      definitions.push({ key, value, text});
    }


    promoConfig.definitionConfig.definitions = definitions;
    this.setStateConfig(promoConfig);
  }

  /**
   * This is a helper function for percentage discount to handle the definition configs
   * @param key
   */
  public getDefinitionConfigs(key: string, isAll: boolean = false) {

    let promoConfig = this._config$.value;
    let definitions = [];

    if (promoConfig.definitionConfig) {
      definitions = promoConfig.definitionConfig.definitions;
      let index = definitions.findIndex(def => def.key == key);

      if (index >= 0) {
        return isAll ? definitions[index] : definitions[index].value
      }
      return '';
    }
  }

  public getDefinitionLabelConfig(key: string) {
    let config = this.getDefinitionConfigs(key, true);

    if (!config || !config.value) {
      return;
    }

    let splitValue = config.value.split('-');
    let choices = this._filterChoices$.value;
    if (splitValue.length <= 1 || !choices) {
      return '';
    }

    let label = '';
    switch(splitValue[1]) {
      case 'category':
      case 'strain':
      case 'brand':
        let sidebar_results = this._localStorage.retrieveItem(STATE.ON_RESULT_GET_PRODUCT_SIDEBAR);
        let index = sidebar_results.findIndex(item => item.category_name.toLowerCase() == splitValue[1]);
        let results = sidebar_results[index].category_items.find(item => item.key == splitValue[0]);
        label = results ? results.name : '';
        break;
      case 'product':
        label = config.text ? config.text : config.value + '12321321';
        break;
      default:
        label = config.value;
    }

    return label;
  }


  /**
   * Sets common Time and Location configurations and validations here
   * @param timingConfig
   */
  public setTimeLocationConfigs(timingConfig: TimingLocationConfig) {
    let config = this._config$.value;
    config.timingLocationConfig = timingConfig;

    // now we need to determine if the current phase is valid
    let valid = timingConfig.startDate &&
                timingConfig.startDate != '' &&
                timingConfig.dispensaries &&
                timingConfig.dispensaries.length > 0;

    if (valid) {
      // make sure atleast one dispensaries is selected
      let checker = false;
      timingConfig.dispensaries.some(dispensary => {
        if (dispensary.selected) {
          checker = true;
          return;
        }
      });

      valid = checker;
    }

    // if still valid, we also need to check the start date + end date
    if (valid && timingConfig.endDate == "") {
      valid = false;
    }

    this.setStateStepValidForm(valid);

    console.log("[setTimeLocationConfigs] set config : ", valid);
    this.setStateConfig(config);
  }

  /**
   * Sets common other configurations and validations here
   * @param otherConfig
   */
  public setOtherSettingsConfig(otherConfig: OtherSettingsConfig) {
    let config = this._config$.value;
    config.otherSettingsConfig = otherConfig;

    // now we need to determine if the current phase is valid
    if (
      otherConfig.usagePerCustomerMax != null &&
      otherConfig.totalUsageLimit != null &&
      (otherConfig.promoStackGroup == null || otherConfig.promoStackGroup.value != null ) &&
      otherConfig.chargeType != null
    ) {
      this.setStateStepValidForm(true);
    } else {
      this.setStateStepValidForm(false);
    }

    console.log('[setOtherSettingsConfig] set config : ', otherConfig);

    this.setStateConfig(config);
  }

}
