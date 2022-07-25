import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {
  Product,
  IProduct,
  IProductBatch,
  IProductBatchProfile,
} from 'src/app/models';
import { fadeAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-shared-active-batch-profiles',
  templateUrl: './active-batch-profiles.component.html',
  styleUrls: ['../shared-product-component.scss'],
  animations: [fadeAnimation],
})
export class ActiveBatchProfiles implements OnInit, OnDestroy {
  @Input() is_disabled: boolean = true;
  private subscription: Subscription = new Subscription();

  profiles: IProductBatchProfile[] = [];
  product: IProduct = new Product();

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

  private async boostrapProduct() {
    this.subscription.add(
      this._prodService.subscribeCurrentProduct.subscribe((prod) => {
        if (prod.id !== -1) {
          this.profiles = [];
          this.product = prod;
          this.is_disabled = false;
          let batch: IProductBatch;

          for (batch of this.product.batches) {
            if (batch.status === 'active' && batch.id !== -1) {
              batch.batch_profile.batch_id = batch.id;
              //copy the fields to profile for display purposes
              batch.batch_profile.batch_number = batch.batch_number;
              batch.batch_profile.batch_date = batch.batch_date;
              batch.batch_profile.exp_date = batch.exp_date;
              this.profiles.push(batch.batch_profile);
            }
          }
        }
      })
    );
  }
}
