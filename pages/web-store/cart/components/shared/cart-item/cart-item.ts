import { Component, Input, OnInit,OnDestroy} from '@angular/core';
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import { ICartItem} from 'src/app/models/'; 
import { Subscription } from 'rxjs'; 
import { ToastrService } from 'ngx-toastr';
import { uuid } from 'ngx-custom-validators/src/app/uuid/validator';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.scss']
})
export class CartItemComponent implements OnInit ,OnDestroy {  
  private subscription: Subscription = new Subscription();
  variation : any;  
  qty : number = 0;

  constructor( 
    private _store: WebstoreStateService, private _toastr: ToastrService  
  ) {}   
 
  @Input() item: ICartItem  = null; 
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {   
    this.qty = this.item.qty;
    this.variation = this.item.variations.find(x => x.id === this.item.product_variation_id);  
  }

  public clickUpdate(){
    this._store.do({state:STATE.UPDATE_CART,payload: {variation :  this.variation, 
      product_variation_id : this.item.product_variation_id, uuid: this.item.uuid, qty : this.qty } } );  
      
  }

  public clickDecrement(){
    if(this.qty > 1) { 
      this.qty--; 
      this.clickUpdate(); 
    }
  }
  
  public clickIncrement(){
    this.qty++; 
    this.clickUpdate(); 
  }

  public clickDelete(){
    this._store.do({state:STATE.DELETE_ITEM_FROM_CART,payload: {product_variation_id : this.item.product_variation_id } } );
  }

  
}