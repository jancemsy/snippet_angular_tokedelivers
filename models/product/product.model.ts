export interface IProductItem {  
  product_id: 1;
  dispensary_id? : number;
  dispensary_name? : string; 
  name: string;
  brand: string;
  image: string;
  thumbnails: IProductItemThumbnail[];
  variations: IProductItemVariation[];
  selected_variation_index: number;
  description: string;
  thc: number;
  cbd: number;
  cannabinoids: IProductItemCannabinoid[];
  terpenes: IProductTerpeneItem[];
  flavours: IProductItemFlavour[];
  effects: IProductItemEffect[];
  review: IProductItemReview;
  type?: string;
  category?: IProductCategory;
}

export interface IProductItemReview{
  name: string;
  avatar: string;
  message: string;
}


export interface IProductItemCannabinoid{
  name: string;
  score: number;
}

export interface IProductTerpeneItem{
  name: string;
  color: string;
}


export interface IProductTerpeneProfileItem{
  flavor: string;
  flavor_score: number;
  effect: string;
  effect_score: number;
  color?: string;
}

export interface IProductItemFlavour{
  icon : string;
  name: string;
  score: number;
}

export interface IProductItemEffect{
  name: string;
  score: number  ;
}






export interface IProductItemSidebar {
  category_name: string;
  category_items: IProductItemSidebarItem[];
  is_expanded: boolean;
}

export interface IProductItemSidebarItem{
  name: string;
  key : any;
  subcategories ? :any[];
  isChecked: boolean;
  isVisible: boolean;
}

export interface IProductListFilter{
  strains : any[];
  categories : any[];
  brands : any[];
  dispensaries : any[];
  term : string;
}

export interface IProductItemListInfo{
  total: number;
  last_page : number;
  current_page: number;
  filter?: any;
  is_dispensary? : boolean; 

  /*
  strain?: any;
  brand?: any;
  dispensaries?: any;
  order_by?: any;
  search?: any;
  */
}

export interface IProductItemVariation{
  id?: number; 
  sku: string;
  unit: string;
  measurement: string;
  weight: string;
  amount: number | string;
}
export interface IProductItemThumbnail{
  image:string;
  selected:boolean;
}


export interface IProductBatchProfile {
  batch_id: number;

  batch_number?: string;
  batch_date?: string;
  exp_date?: string;

  terpenses: IProductBatchTerpense;
  cannabinoids: IProductBatchCannabinoid[];
  expected_effects: IProductBatchEffect[];
  expected_flavours: IProductBatchFlavour[];
}

export interface IProductCategory {
  id: number;
  name: string;
  subcategories: IProductSubCategory[];
}

export interface IProductSubCategory {
  id: number;
  category_id: number; //parent category id
  name: string;
}

export interface IProduct {
  id?: number;
  product_name: string;
  supplier_name: string;
  supplier_license: string;

  category_id?: number;
  sub_cateogry_id?: number;
  cannabis_type?: string;
  strain: string;
  description: string;
  producer: string;
  is_medical: boolean;

  product_image?: any;

  variations: IProductVariation[];
  batches: IProductBatch[];
}

export interface IProductCategories {
  product_categoryies?: { option: string; value: string }[];
  sub_categories?: { option: string; value: string }[];
  cannabis_types?: { option: string; value: string }[];
}

export interface IProductVariation {
  id?: number;
  product_id: number;
  sku_number: string;
  metrc_tag: string;
  measurement: string;
  units: string;
  price: number | any;
}

export interface IProductBatchProfile {
  id?: number;

  terpenses: IProductBatchTerpense;
  cannabinoids: IProductBatchCannabinoid[];
  expected_effects: IProductBatchEffect[];
  expected_flavours: IProductBatchFlavour[];
}

export interface IProductBatch {
  id?: number;
  product_id: number;

  batch_number: string;
  batch_date: string;
  exp_date: string;
  status: string;
  cbd?: string;
  thc?: string;

  profile_json?: any;

  batch_profile: IProductBatchProfile;
}

export interface IProductBatchTerpense {
  primary: string;
  secondary: string;
  tertiary: string;
  cbd?: number;
  thc?: number;
}

export interface IProductBatchCannabinoid {
  name: string;
  percent: number;
}

export interface IProductBatchEffect {
  effect: string;
  score: number;
}

export interface IProductBatchFlavour {
  flavour: string;
  score: number;
}
