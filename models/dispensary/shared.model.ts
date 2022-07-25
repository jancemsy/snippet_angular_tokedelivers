export interface Phase {
    step: number,
    layout: string,
    title: string,
    navigation: boolean,
    info?: string,
    nav_button: string,
    nav_next: false
}

export interface InfoCardConfig {
    title?: string;
    slug? : string;
    parentSlug? : string;
    icon? : string;
    description? : string;
}

export interface ImageNameForm {
    name: string;
    promocode: string;
    image: string;
}

export interface Definition {
    id?: number;
    key?: string;
    value?: any;
    text?: string;
}


export interface NavStepsSlider {
    step: number;
    label: string;
    isActive: boolean;
    disabled?: boolean;
}

export interface PromoType{
    id? : number,
    name : string,
    abbr : string;
}

export interface LoyaltyType{
    id? : number,
    name : string,
    abbr : string;
}

export interface PromoStackGroup{
    id : number,
    name : string,
    company_id : number,
    promos? : any[],
}

export interface PromoConfig {
    id : number,
    companyId : number,
    name : string,
    description : string,
    code : string,
    avatar : string,
    type : string,
    definitionConfig : DefinitionConfig,
    timingLocationConfig : TimingLocationConfig,
    otherSettingsConfig : OtherSettingsConfig,
    status: string,
}


export interface LoyaltyConfig {
    id : number,
    companyId : number,
    name : string,
    description : string,
    type : string,
    status : string,
    definitionConfig : DefinitionConfig,
    timingLocationConfig : TimingLocationConfig,
}

export interface DefinitionConfig {
    id? : number;
    definitions : Definition[]
}

export interface TimingLocationConfig {
    id? : number;
    startDate : string,
    endDate : string,
    dispensaries : Array<any>,
    specificTimeStart : string,
    specificTimeEnd : string,
    specificDays : Array<string>,
}

export interface OtherSettingsConfig {
    id? : number;
    usagePerCustomerMax : number,
    totalUsageLimit : number,
    chargeType : string,
    customerGroups : Array<any>,
    promoStackGroup : any,
}

export interface DiscountSettingsNavItem{
    title : string,
    slug : string,
    icon : string,
}

export interface DiscountGroup{
    id? : number,
    name : string,
}

export interface LoyaltyTierSetting{
    id : number,
    company_id : string,
    status : number,
    tiers : LoyaltyTier[],
}

export interface LoyaltyTier{
    id?: number,
    name : string,
    icon: string,
    upgrade: number,
    upgrade_type: string,
    loyalty_tier_setting_id: number,
    sequence : number,
    status : number,
    color: string
}

export interface PromoLimit{
    id? : number,
    company_id : number,
    discount_amount_no_max : number,
    discount_percent_no_max : number,
    discount_amount_max : number,
    discount_percent_max : number,
}