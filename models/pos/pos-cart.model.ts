import { IPosProductVariantPackage } from '../pos/pos-product.model';

export interface PosCartItem {
    id :number; 
    variant_id : number; 
    name : string;
    package : IPosProductVariantPackage;
    price: number;
    quantity: number; 
    status: number; 
    img_src: string; 
    measurement : string;
    unit : string;
  }

export interface PosCartSummary {
    subTotal : number; 
    discount : number;
    salesTax : number;
    total: number;
  }
   