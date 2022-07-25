import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { ActivatedRoute } from '@angular/router';
import { Product, IProduct } from 'src/app/models';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { pageAnimations } from 'src/app/shared/animations';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['../shared/shared-product-form-component.scss'],
  animations: [pageAnimations],
})
export class EditProductComponent implements OnInit, OnDestroy {
  @HostBinding('@pageAnimations')
  private subscription: Subscription = new Subscription();

  product_id: number = -1;
  product: IProduct = new Product();

  constructor(
    private route: ActivatedRoute,
    private _topNavState: TopNavStateService,
    private _prodService: ProductService
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this._prodService.subscribeCurrentProduct.subscribe((prod) => {
        this.product = prod;
      })
    );
    this.route.params.subscribe((params) => {
      this.product_id = params.id;
      this._prodService.fetch_product(this.product_id);
    });
  }
}
