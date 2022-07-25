import { Component, OnInit,OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';  
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import { Subscription } from 'rxjs'; 
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';


@Component({
  selector: 'app-store-one-cart-popup',
  templateUrl: './one-cart.component.html',
  styleUrls: ['./one-cart.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
}) 
export class OneCartComponent implements OnInit,OnDestroy {
  on_cart_dispensary_error : boolean = false; 
  is_session_expired : boolean = false;  
  payload : any = null;  

  private subscription: Subscription = new Subscription();

  constructor( 
    private _store: WebstoreStateService,
    private ref: ChangeDetectorRef,
    private _localStorage: LocalStorageService,
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {    
    //const loginInfo: any = this._localStorage.retrieveItem('loginInfo'); 
    /*if (loginInfo && loginInfo.access_token) { 
         loginInfo.access_token = 'broken'; 
         this._localStorage.storeLocal('loginInfo', loginInfo); 
    }
    */


    this.subscription.add(
      this._store.sync(STATE.ON_CART_DISPENSARY_ERROR, (data) => {           
        this.payload = data;  
        this.on_cart_dispensary_error = true; 
        this.ref.detectChanges();
      }));



      this.subscription.add(
        this._store.sync(STATE.ON_SESSION_EXPIRED, (data) => {            
          this.is_session_expired = true;
          this.ref.detectChanges();
        })); 
  }


  
  public clickLogin(){
    this._localStorage.reset();
    location.href = '/auth/login';
  }

  public clickContinueAsGuest(){ 
    this._localStorage.reset();
    this.is_session_expired = false;  
  }

 public clickStartNewCart(){ 
  let data : any = { new_cart: true,  variation: this.payload.variation, product: this.payload.product};  
  this._store.do({ state: STATE.ADD_ITEM_TO_CART, payload: data });    
  this.on_cart_dispensary_error = false;  
 }

 public clickKeepExisting(){
   this.on_cart_dispensary_error = false;  
 }





   
}
