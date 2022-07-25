export interface ContactInformation {
  first_name: string;
  last_name: string;
  phone_number?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface IdentificationInfo {
  drivers_license_number: string;
  drivers_license_state: string;
  drivers_license_photo: string;
}
