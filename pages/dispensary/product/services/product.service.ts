import { Injectable } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import {
  IProduct,
  IProductCategory,
  IProductVariation,
  Product,
  IProductBatch,
  IProductBatchProfile,
} from 'src/app/models';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _api: ProductApiService) {}

  product: IProduct = new Product();

  public subject = new Subject<any>();
  private ProductSubject = new BehaviorSubject(this.product);

  get subscribeCurrentProduct(): Observable<any> {
    return this.ProductSubject.asObservable();
  }

  set updateCurrentProduct(message: any) {
    this.product = message;
    this.ProductSubject.next(message);
  }

  public async save_batch_profile(profile: IProductBatchProfile): Promise<any> {
    let result: any = await this._api.update_batch_profile(profile);
    if (result.success === true) {
      this.updateCurrentProduct = this.product;
    }
    return result;
  }

  public async save_batch(batch: IProductBatch) {
    let is_new: boolean = batch.id === -1 ? true : false;
    let result: any = await this._api.update_batch(batch);

    if (result.success === true) {
      if (batch.status == 'active') {
        for (let b of this.product.batches) {
          b.status = 'inactive';
        }
      }

      if (is_new) {
        console.log('added batch now is1 >>>>', this.product.batches);
        batch.id = Array.isArray(result.data)
          ? result.data[0].id
          : result.data.id;
        this.product.batches.push(batch);
      } else {
        let index = this.product.batches.findIndex((x) => x.id == batch.id);
        this.product.batches[index] = batch;
      }

      console.log('added batch now is2 >>>>', this.product.batches);
      this.updateCurrentProduct = this.product;
    }

    return result;
  }

  public async save_variation(variation: IProductVariation) {
    let is_new: boolean = variation.id === -1 ? true : false;
    let result: any = await this._api.update_variation(variation);

    if (result.success === true) {
      if (is_new) {
        console.log('added variations now is1 >>>>', this.product.variations);
        variation.id = result.data.id;
        this.product.variations.push(variation);
      } else {
        let index = this.product.variations.findIndex(
          (x) => x.id == variation.id
        );
        this.product.variations[index] = variation;
      }

      console.log('added variations now is2 >>>>', this.product.variations);
      this.updateCurrentProduct = this.product;
    }

    return result;
  }

  public async save_product(form: IProduct): Promise<any> {
    console.log('save here in api 1');
    let result: any = await this._api.update(form);

    if (result.success === true) {
      console.log('save here in api 2');
      form.id = result.data.id;
      console.log('save here in api updating the id to 3', form.id);
      this.updateCurrentProduct = form;
    }

    return result;
  }

  public async delete_batch(batch_id: number): Promise<any> {
    let result: any = await this._api.delete_batch(batch_id);
    if (result.success === true) {
      let index = this.product.batches.findIndex((x) => x.id === batch_id);
      this.product.batches.splice(index, 1);
      this.updateCurrentProduct = this.product;
    }
    return result;
  }

  public async delete_variation(variation_id: number): Promise<any> {
    let result: any = await this._api.delete_variation(variation_id);
    if (result.success === true) {
      let index = this.product.variations.findIndex(
        (x) => x.id === variation_id
      );
      this.product.variations.splice(index, 1);
      this.updateCurrentProduct = this.product;
    }
    return result;
  }

  public async upload_product_image(form: any): Promise<any> {
    return Promise.resolve(this._api.upload_product_image(form));
  }

  public async fetch_product(product_id: number): Promise<any> {
    let result: any = await this._api.get_product(product_id);
    return new Promise((resolve) => {
      if (result.success === true) {
        this.updateCurrentProduct = result.data;
      } else {
        resolve(false);
      }
    });
  }

  public async get_categories(): Promise<IProductCategory[]> {
    let categories: IProductCategory[] = [];
    let result: any = await this._api.get_categories();
    if (result.success === true) {
      categories = result.data;
    }
    return categories;
  }
}
