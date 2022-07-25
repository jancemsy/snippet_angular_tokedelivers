export interface IPosProductItem {
    product_id: 1;
    name: string;
    brand: string;
    image: string;
    thumbnails: IPosProductItemThumbnail[];
    variations: IPosProductItemVariation[];
    selected_variation_index: number;
    description: string;
    thc: number;
    cbd: number;
    cannabinoids: IPosProductItemCannabinoid[];
    terpenes: IPosProductTerpeneItem[];
    flavours: IPosProductItemFlavour[];
    effects: IPosProductItemEffect[];
    review: IPosProductItemReview;
    type?: string;
    category?: IPosProductCategory;
  }

  export interface IPosProductCategory {
    id: number;
    name: string;
    subcategories: IPosProductSubCategory[];
  }

  export interface IPosProductSubCategory {
    id: number;
    category_id: number; //parent category id
    name: string;
  }
   
  export interface IPosProductItemReview{
    name: string;
    avatar: string;
    message: string;
  }
  
  export interface IPosProductItemCannabinoid{
    name: string;
    score: number;
  }
  
  export interface IPosProductTerpeneItem{
    name: string;
    color: string;
  }
  
  
  export interface IPosProductTerpeneProfileItem{
    flavor: string;
    flavor_score: number;
    effect: string;
    effect_score: number;
    color?: string;
  }
  
  export interface IPosProductItemFlavour{
    icon : string;
    name: string;
    score: number;
  }
  
  export interface IPosProductItemEffect{
    name: string;
    score: number  ;
  }
  
  
  
  

export interface IPosProductItemVariation{
    variant_id : number,
    packages: IPosProductVariantPackage[];
    unit: string;
    measurement: string;
    weight: string;
    amount: number | string;
  }
  
  export interface IPosProductItemThumbnail{
    image:string;
    selected:boolean;
  }
  
  export interface IPosProductVariantPackage{
    package_number : string,
    sku : string,
  }