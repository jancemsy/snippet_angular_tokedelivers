import { Component, OnInit,OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ICartItem} from 'src/app/models/'; 
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import { Subscription } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations';  


@Component({
  selector: 'app-store-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
  animations: [fadeAnimation],
})
export class CartPopupComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();


  cart : ICartItem[] = [];
  cart_count : number = 0;
  cart_total_amount : number = 0;

  constructor( 
    private _store: WebstoreStateService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {   
    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_CART, (data) => {  
         this.cart = data.cart;    
         this.cart_count  = data.count; 
         this.cart_total_amount = data.total_amount; 
         this.ref.detectChanges();
      }) 
    ); 

 
    this._store.do({ state: STATE.GET_CART, payload: {refresh : true } });      
  }

  public clickViewCart(){
    location.href='/cart';
  }

  public clickCheckOut(){
    location.href="customer/checkout";
   }
}
