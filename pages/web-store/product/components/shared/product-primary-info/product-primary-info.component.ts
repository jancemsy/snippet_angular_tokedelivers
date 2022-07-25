import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { IProductItem } from 'src/app/models/';
import { WebstoreStateService, STATE } from 'src/app/services/state-management/webstore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-primary-info',
  templateUrl: './product-primary-info.component.html',
  styleUrls: ['./product-primary-info.component.scss'],
})
export class ProductPrimaryInfoComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  @Output() notifyParent: EventEmitter<any> = new EventEmitter();
  @Input() product: IProductItem = null;

  variation: any = {};

  //for display
  currency: string = '$';
  amount: string = '0';
  decimal: string = '00';
  is_added_to_cart : boolean = false; 

  constructor(private _store: WebstoreStateService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_CART, (data) => {   
          let variation = this.product.variations[
            this.product.selected_variation_index
          ];   

          this.is_added_to_cart = ( data.cart.findIndex(x => x.product_variation_id == variation.id ) > -1);  
      }) 
    ); 

   this._store.do({ state: STATE.GET_CART, payload: {refresh : false } });       

    this.amount_decimal(
      this.product.variations[this.product.selected_variation_index].amount
    );
    this.variation = this.product.variations[
      this.product.selected_variation_index
    ]; 
  }

  public clickChangeVariation() {
    let variation = this.product.variations[
      this.product.selected_variation_index
    ]; 

    this._store.do({
      state: STATE.UPDATE_SELECTED_PRODUCT,
      payload: { product: this.product },
    });
    this.amount_decimal(variation.amount);
  }

  private amount_decimal(val) {
    val = parseFloat(val).toFixed(2);
    let _arr = `${val}`.split('.');
    this.amount = _arr[0];
    this.decimal = _arr[1];
  }

  public clickAddCart(){
    let variation = this.product.variations[
      this.product.selected_variation_index
    ];  
    let data : any = { variation: variation, product: this.product}; 
    this._store.do({ state: STATE.ADD_ITEM_TO_CART, payload: data });      
  }

  public clickRemoveCart(){
    let variation = this.product.variations[
      this.product.selected_variation_index
    ]; 
    this._store.do({state:STATE.DELETE_ITEM_FROM_CART,payload: {product_variation_id : variation.id } } );    
  }
}
