import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product, IProduct, IProductBatch, Batch } from 'src/app/models';
import { fadeAnimation, listAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-shared-batch-variations',
  templateUrl: './batch-variations.component.html',
  styleUrls: ['../shared-product-component.scss'],
  animations: [listAnimation, fadeAnimation],
})
export class BatchVariationsComponent implements OnInit, OnDestroy {
  @Input() is_disabled: boolean = true;
  private subscription: Subscription = new Subscription();

  product: IProduct = new Product();
  batch: IProductBatch = null;
  errors: string[] = [];
  is_new: boolean = true;
  is_saving: boolean = false;
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

  public clickEdit(item: IProductBatch) {
    this.batch = Object.assign({}, item);
    this.errors = [];
  }

  public async clickDelete(item: IProductBatch) {
    let result = await this._prodService.delete_batch(item.id);
    if (result.success) {
      this._toastr.info('The batch was successfully deleted!');
    } else {
      this._toastr.info('There is an error deleting the batch.');
    }
  }

  public async clickAddBatch() {
    console.log('test add batch data', this.batch);
    let is_new: boolean = this.batch.id === -1 ? true : false;
    this.is_saving = true;
    let result = await this._prodService.save_batch(this.batch);
    this.is_saving = false;

    if (result.success) {
      this._toastr.info(
        'Successfully ' + (is_new ? 'added' : 'updated') + ' the batch!'
      );
      this.batch = new Batch(this.product.id);
    } else {
      this.errors = result.errors;
      console.log('errors ', this.errors);
      this._toastr.error(
        'There was error ' +
          (is_new ? 'adding' : 'updating') +
          ' the batch. Please correct the error!'
      );
    }
  }

  private async boostrapProduct() {
    this.subscription.add(
      this._prodService.subscribeCurrentProduct.subscribe((prod) => {
        if (prod.id !== -1) {
          this.product = prod;
          this.is_disabled = false;
          this.batch = new Batch(this.product.id);
        }
      })
    );
  }
}
