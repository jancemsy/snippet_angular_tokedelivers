import { CustomerCardIdentification } from './customer-card-identification.model';

export interface Customer {
  // TODO something pa here
  customer_id: number;
  default_profile?: CustomerProfile;
  user: CustomerUser;
  email?: string;
  memberSince?: string;
  memberType?: string;
  orders?: any[] | number;
  totalSpent?: number;
  tier?: number | string;
  identification?: CustomerCardIdentification;
  payment_options?: any;
  rewards?: any;
}

export interface CustomerProfile {
  is_primary: number;
  phone_number: String;
  profile_id: number;
  zip: String;
  address_line_1: String;
  address_line_2: String;

  // missing fields
  name: String;
  city: String;
  state: String;
  country: String;
}

export interface CustomerUser {
  first_name: String;
  id: number;
  last_name: String;
  email: String;
  birth_date: String;
  profiles?: any;
  imgUrl?: string;
  phone: string;
}
