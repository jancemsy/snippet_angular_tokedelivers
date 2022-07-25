import { ContactInformation, IdentificationInfo } from './contact-info.model';
export interface ICompanyInformation {
  email?: string;
  legal_company_name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface IDispensaryInformation {
  dispensary_name: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface ILicenseInformation {
  license_number: string;
  license_state: string;
  license_issue_date: string;
  license_expiration: string;
  license_photo: string;
}

export interface IFinalRegData {
  access_token: string,
  company_info: ICompanyInformation,
  contact_info: ContactInformation,
  dispensary_info: ICompanyInformation,
  identification_info: IdentificationInfo,
  license_info: ILicenseInformation,
}

export interface IRegFinalStepData {
  access_token: string;
  legal_company_name: string;
  company_address_line_1: string;
  company_address_line_2: string;
  company_city: string;
  company_state: string;
  company_zip: string;
  admin_first_name: string;
  admin_last_name: string;
  admin_phone_number: string
  admin_mobile_number: string;
  admin_address_line_1: string;
  admin_address_line_2: string
  admin_city: string;
  admin_state: string;
  admin_zip: string;
  admin_drivers_license_number: string;
  admin_drivers_license_state: string;
  admin_drivers_photo: string;
  dispensary_name: string;
  dispensary_address_line_1: string;
  dispensary_address_line_2: string;
  dispensary_city: string;
  dispensary_state: string;
  dispensary_zip: string;
  dispensary_license_number: string;
  dispensary_license_state: string;
  dispensary_license_issue_date: string;
  dispensary_license_expiration_date: string;
  dispensary_license_photo: string;
  status: string;
}
