export interface SelectDropDown {
  label: string;
  value: any;
}

export interface SelectDropDownConfig {
  displayKey: string;
  search?: boolean;
  height?: string;
  moreText?: string;
  searchOnKey?: string;
  searchPlaceholder?: string;
}

export interface SelectMulti {
  text: string;
  value?: string | number;
  children?: SelectMulti[];
}