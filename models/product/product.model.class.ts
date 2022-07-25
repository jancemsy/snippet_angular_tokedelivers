import {
  IProduct,
  IProductBatch,
  IProductVariation,
  IProductBatchProfile,
  IProductBatchCannabinoid,
  IProductBatchTerpense,
  IProductBatchEffect,
  IProductBatchFlavour,
} from './product.model';

export class Product implements IProduct {
  id?: number = -1;
  product_name: string = '';
  supplier_name: string = '';
  supplier_license: string = '';

  category_id?: number = 0;
  sub_cateogry_id?: number = 0;
  cannabis_type?: string = '';
  strain: string = '';
  description: string = '';
  producer: string = '';
  is_medical: boolean = true;

  variations: IProductVariation[] = [];
  batches: IProductBatch[] = [];

  constructor() {}

  product_image: any = '';
}

export class Variation implements IProductVariation {
  id?: number = -1;
  product_id: number = -1;
  sku_number: string = '';
  metrc_tag: string = '';
  measurement: string = '';
  units: string = '';
  price: number | any = null;
  constructor(product_id: number) {
    this.product_id = product_id;
  }
}

export class Batch implements IProductBatch {
  id?: number = -1;
  product_id: number = -1;

  batch_number: string = '';
  batch_date: string = '';
  exp_date: string = '';
  status: string = 'active';

  profile_json: any = null; //raw

  batch_profile: IProductBatchProfile = new BatchProfile();

  constructor(product_id: number) {
    this.product_id = product_id;
  }
}

export class BatchProfile implements IProductBatchProfile {
  batch_id: number = -1;
  batch_number: string = '';
  batch_date: string = '';
  exp_date: string = '';

  id: number = -1;
  terpenses: IProductBatchTerpense = {
    primary: '',
    secondary: '',
    tertiary: '',
    cbd: 0,
    thc: 0,
  };
  cannabinoids: IProductBatchCannabinoid[] = [];
  expected_effects: IProductBatchEffect[] = [];
  expected_flavours: IProductBatchFlavour[] = [];

  constructor() {
    for (let i = 0; i < 8; i++) {
      this.cannabinoids.push({ name: '', percent: 0 });
    }

    for (let i = 0; i < 6; i++) {
      this.expected_effects.push({ effect: '', score: 0 });
      this.expected_flavours.push({ flavour: '', score: 0 });
    }
  }
}
