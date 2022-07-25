import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductItem } from 'src/app/models/';
import { WebstoreStateService, STATE, } from 'src/app/services/state-management/webstore';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();

  //NOTE: we identify individual product item by variation_id
  variation_id: number = -1;
  product: IProductItem = null;
  isAddedToCart: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private _store: WebstoreStateService,
    private _toastr: ToastrService,
  ) {
    console.log('ereere');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_SELECTED_PRODUCT , (data) => { 
        this.product = data;
      })
    );

    this._store.do({ state: STATE.GET_SELECTED_PRODUCT }); //trigger get select product


    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_ADD_ITEM_TO_CART, (data) => {   
        this.isAddedToCart = true; 
        //this._toastr.success("New item has been added.");
      })
    );  
  }

  public clickSelected(item) {
    this.product.image = item.image;
    this.product.thumbnails = this.product.thumbnails.map((x) => {
      x.selected = item.image === x.image ? true : false;
      return x;
    });
  }
}
