export interface Dispensary {
  dispensary_id : number;
  dispensary_name: string;
  dispensary_address_line_1: string;
  dispensary_city: string;
  email: string;
  phone_number: string;
  dispensary_number: string;
  dispensary_state: string;
  employees: number|string;
  status: number | string;
  details: DispensaryDetails;
  pick_up: number;
  delivery: number;
  logo_url : string;
}

export interface DispensaryDetails {
  employees: DispensaryEmployee[];
  working_hours: DispensaryWorkingHour[];
  social_media: DispensarySocialMedia;
  license: DispensaryLicense;
}

export interface DispensaryEmployee {
  email: string;
  first_name: string;
  full_anme: string;
  last_name: string;
  role?: string;
  roles?: string[];
}

export interface DispensaryLicense {
  license_status: string;
  license_state: string;
  license_number: string;
  license_issue_date: string;
  license_exp_date: string;
}

export interface DispensarySocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  google: string;
}

export interface DispensaryWorkingHour {
  day: string;
  start: string;
  end: string;
  is_closed: boolean;
  schedule_id: number;
}


export interface RecommendedStrain{
  product : RecommendedStrainProduct;
  variant : RecommendedStrainVariant;
}

export interface RecommendedStrainProduct{
product_id : number;
brand : string;
category : string;
description : string;
name : string;
producer : string;
strain : string;
sub_category : string;
supplier_name : string;
type : string;
images : any[],
reviews : any[],
}


export interface RecommendedStrainVariant{
variant_id : number;
measurement : string;
package_number : string;
price : number;
qty : number;
sku : string;
threshold : number;
unit : string;
}

export interface SpecialDeal{
  dispensary_id : number;
  description : string;
  detail : string;
  promo : string;
  thumbnail_url : string;
  title : string;
}

export interface DispensarySelect {
  id: number;
  name: string;
  selected: boolean;
}
