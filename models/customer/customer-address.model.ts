export interface CustomerAddress {
  address_line_1: String;
  address_line_2: String;
  is_primary: number;
  phone_number: String;
  zip: String;

  // missing fields
  name: String;
  city: String;
  state: String;
  country: String;

  // optional fields (for existing address)
  profile_id?: number;

}