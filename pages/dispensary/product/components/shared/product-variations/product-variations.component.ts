import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  Product,
  IProductVariation,
  Variation,
  IProduct,
} from 'src/app/models';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Subscription } from 'rxjs';
import { fadeAnimation, listAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-shared-varations',
  templateUrl: './product-variations.component.html',
  styleUrls: ['../shared-product-component.scss'],
  animations: [listAnimation, fadeAnimation],
})
export class ProductVariationsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Input() is_disabled: boolean = true;
  product: IProduct = new Product();
  variation: IProductVariation = null;
  is_saving: boolean = false;
  errors: string[] = [];
  is_open: boolean = true;

  constructor(
    private _toastr: ToastrService,
    private ref: ChangeDetectorRef,
    private _prodService: ProductService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.boostrapProduct();
  }

  private async boostrapProduct() {
    this.subscription.add(
      this._prodService.subscribeCurrentProduct.subscribe((prod) => {
        if (prod.id !== -1) {
          this.product = prod;
          this.is_disabled = false;
          this.variation = new Variation(this.product.id);
        }
      })
    );
  }

  public clickEdit(item: IProductVariation) {
    this.variation = Object.assign({}, item);
    this.errors = [];
  }

  public async clickDelete(item: IProductVariation) {
    let result = await this._prodService.delete_variation(item.id);
    if (result.success) {
      this._toastr.info('The variant was successfully deleted!');
    } else {
      this._toastr.info('There is an error deleting the variant.');
    }
  }

  public async clickAdd() {
    let is_new: boolean = this.variation.id === -1 ? true : false;
    this.is_saving = true;
    let result = await this._prodService.save_variation(this.variation);
    this.is_saving = false;

    if (result.success) {
      this._toastr.info(
        'Successfully ' + (is_new ? 'added' : 'updated') + ' the variant!'
      );
      this.variation = new Variation(this.product.id);
    } else {
      this.errors = result.errors;
      console.log('errors ', this.errors);
      this._toastr.error(
        'There was error ' +
          (is_new ? 'adding' : 'updating') +
          ' the variant. Please correct the error!'
      );
    }
  }
}
