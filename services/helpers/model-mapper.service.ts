import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { LoyaltyConfig, PromoConfig, PromoLimit } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class ModelMapperService {

  constructor() { }

  public mapLoyaltyConfigDataToApi(config : LoyaltyConfig){
    let data = {
      id : config.id,
      company_id : config.companyId,
      name : config.name,
      description : config.description,
      type : config.type,
      status: config.status,
      definitions : config.definitionConfig.definitions,
      timing_location : {
        start_date : config.timingLocationConfig.startDate,
        end_date: config.timingLocationConfig.endDate,
        dispensaries:  config.timingLocationConfig.dispensaries.filter(item => item.selected),
        specific_time_start: config.timingLocationConfig.specificTimeStart,
        specific_time_end: config.timingLocationConfig.specificTimeEnd,
        specific_days: this.mapDays(config.timingLocationConfig.specificDays)
      },
    }

    return data;
  }

  public mapApiToLoyaltyConfigData(data : any){

    let config = {
      id : data.id,
      companyId : data.company_id,
      name : data.name,
      description : data.description,
      type : data.type,
      status : data.status,
      definitionConfig : { definitions: data.definitions },
      timingLocationConfig : {
        startDate : data.timing_location.start_date,
        endDate: data.timing_location.end_date,
        dispensaries:  this.mapDispensaries(data.timing_location.dispensaries),
        specificTimeStart: data.timing_location.specific_time_start,
        specificTimeEnd: data.timing_location.specific_time_end,
        specificDays: this.mapDaysConfig(data.timing_location.specific_days),
      },
    }

    return config;
  }

  public mapPromoConfigDataToApi(config : PromoConfig) : any {
    let data: any = {
      id : config.id,
      company_id : config.companyId,
      name : config.name,
      avatar : config.avatar,
      description : config.description,
      code : config.code,
      type : config.type,
      status : config.status,
      definitions : config.definitionConfig.definitions,
      timing_location : {
        start_date : config.timingLocationConfig.startDate,
        end_date: config.timingLocationConfig.endDate,
        dispensaries: config.timingLocationConfig.dispensaries.filter(item => item.selected),
        specific_time_start: config.timingLocationConfig.specificTimeStart,
        specific_time_end: config.timingLocationConfig.specificTimeEnd,
        specific_days: this.mapDays(config.timingLocationConfig.specificDays)
      },
      other_setting : {
        usage_per_customer_max : config.otherSettingsConfig.usagePerCustomerMax,
        total_usage_limit : config.otherSettingsConfig.totalUsageLimit,
        promo_stack_group_id : config.otherSettingsConfig.promoStackGroup ? config.otherSettingsConfig.promoStackGroup.value : null,
        charge_type : config.otherSettingsConfig.chargeType,
        customer_groups : this.mapCustomerGroups(config),
      },
    }

    // Optional for update only
    if (config.status) {
      data.status = config.status;
    }

    return data;
  }


  public mapApiToPromoConfigData(data : any): PromoConfig{

    // console.log("[MAPPER][mapApiToPromoConfigData] data: ", data);

    let config = {
      id : data.id,
      companyId : data.company_id,
      name : data.name,
      avatar : data.avatar,
      description : data.description,
      code : data.code,
      type : data.type,
      status : data.status,
      definitionConfig : { definitions: data.definitions },
      timingLocationConfig : {
        startDate : data.timing_location.start_date,
        endDate: data.timing_location.end_date,
        dispensaries: this.mapDispensaries(data.timing_location.dispensaries),
        specificTimeStart: data.timing_location.specific_time_start,
        specificTimeEnd: data.timing_location.specific_time_end,
        specificDays:  this.mapDaysConfig(data.timing_location.specific_days),
      },
      otherSettingsConfig : {
        usagePerCustomerMax : data.other_setting.usage_per_customer_max,
        totalUsageLimit : data.other_setting.total_usage_limit,
        promoStackGroup : data.other_setting.promo_stack_group ? {
          value: data.other_setting.promo_stack_group.id,
          text: data.other_setting.promo_stack_group.name
        } : null,
        chargeType : data.other_setting.charge_type,
        customerGroups : data.other_setting.customer_groups ? data.other_setting.customer_groups.map(group => ({ value: group.id, text: group.name })) : null,
      },
    }

    return config;
  }

  public mapApiToPromoLimitData(data : any) : PromoLimit{

    let promoLimit : PromoLimit;

    promoLimit =  {
      id : data.id,
      company_id : data.company_id,
      discount_amount_max : data.discount_amount_max,
      discount_percent_max : data.discount_percent_max,
      discount_amount_no_max : data.discount_amount_no_max,
      discount_percent_no_max : data.discount_percent_no_max,
    }

    return promoLimit;
  }

  // we need to map dispensaries here to identify that this are selected by default
  private mapDispensaries(dispensaries: any) {
    // skip empty dispensaries
    if (!dispensaries || dispensaries.length <= 0) {
      return;
    }
    return dispensaries.map(obj=> ({ ...obj, selected: true }))
  }

  private mapDays(days : any){// skip empty days

    if (!days || days.length <= 0) {
      return null;
    }
    let selectedDays = days.map(obj=> ({ ...obj, selected: true }))

    let specificDaysString = '';

    selectedDays.forEach(day => {
        specificDaysString += day.key + ",";
    });

    return specificDaysString;
  }

  // we need to map dispensaries here to identify that this are selected by default
  private mapDaysConfig(days: any) {
    if(!days){
      return;
    }
    // skip empty dispensaries
    let selectedDaysRaw = days.split(',');
    if (!selectedDaysRaw || selectedDaysRaw.length <= 0) {
      return;
    }

    let selectedDays = [];

    selectedDaysRaw.forEach(day => {
        if(day)
          selectedDays.push({'key' : day, 'text' : day.toUpperCase()})
    });
    console.log(selectedDays);
    return selectedDays.map(obj=> ({ ...obj, selected: true }))
  }

  private mapCustomerGroups({ otherSettingsConfig }) {
    if (otherSettingsConfig.customerGroups) {
      return otherSettingsConfig.customerGroups.map(group => group.value);
    }
    return [];
  }

}
