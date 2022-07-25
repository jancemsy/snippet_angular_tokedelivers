import { Component, OnInit,OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ICartItem, IDiscountItem,ICartRewardLoyalty} from 'src/app/models/';  
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import { Subscription } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations';  
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
  animations: [fadeAnimation],
})
export class CartDetailComponent implements OnInit,OnDestroy {  
  private subscription: Subscription = new Subscription();
  

  input_promo_code: string = ""; 
  is_discount_show : boolean = false; 
  is_show_reward_popup : boolean = false; 
  discounts: IDiscountItem[]   = []; 
  cart : ICartItem[] = [];
  cart_count : number = 0;
  total : number = 0; 
  total_discount : number = 0;

  constructor( 
    private _store: WebstoreStateService, private _toastr: ToastrService, 
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
         this.total = data.total_amount; 
         this.ref.detectChanges();
      }) 
    ); 

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_EMPTY_CART, (data) => {  
        this._toastr.success("Cart has been emptied.");
      }) 
    ); 

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_DELETE_ITEM_FROM_CART, (data) => {    
        //this._toastr.success("Cart Item has been deleted.");
      }) 
    ); 
     
    
    
    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_USER_APPLIED_DISCOUNTS, (payload) => {    
        if(payload.success){
          console.log("applied result", payload.data);
          this.discounts   = payload.data;
        }
      }) 
    );  

     

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_APPLY_PROMO_CODE, (payload) => {    
         if(payload.success)  { 
            this._toastr.success("Promo has been applied");             
            this.is_discount_show = true; 
           //TODO: integrate actual info of this promo code; 
            this.discounts.push({ name: "promotion", code : this.input_promo_code, id : -1, type : "coupon", discount : 10 }); 
           this.computeTotal();
          //todo 
         }else{
          this.input_promo_code = ""; 
          this._toastr.error("Invalid Promo Code."); 
         }
      }) 
    );  
 
 
    this._store.do({ state: STATE.GET_USER_APPLIED_DISCOUNTS, payload: {refresh : true } });      

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_DELETE_APPLIED_PROMO, (payload) => {    
         if(payload.success)  {
           let promo_id = payload.data; 
           let index = this.discounts.findIndex(x => x.id == promo_id);
           this.discounts.splice(index, 1); 
           this._toastr.success("Promo has been deleted."); 
           this.computeTotal();
         }
      }) 
    );  


    


  }

  private computeTotal(){
    this.total_discount = 0;
    for(let item of this.discounts){
      this.total_discount += item.discount; 
    }
    this.total = this.total - this.total_discount;
  }

  public clickApplyPromo(){  
    this._store.do({ state: STATE.APPLY_PROMO_CODE, payload: { promo_code : this.input_promo_code } });      
  }
 


  public clickCheckOut(){
   location.href="customer/checkout";
  }

  public clickEmptyCart(){
    this._store.do({ state: STATE.EMPTY_CART, payload: { } });      
  }    

  public reward_popup_state(state){ 
    if(state.close){
      this.is_show_reward_popup = false;  
    }else{ 
      if(state.success){
        this.is_discount_show = true;   
        let reward:ICartRewardLoyalty = state.reward;  
        this.discounts.push({ name: "Reward", code : "", id : reward.id, type : "reward", discount : reward.discount  }); 
        this.computeTotal(); 
        this.is_show_reward_popup = false;  
        this._toastr.success("Rewards has been redeemed!"); 
      }else{
        this._toastr.error("Error redeeming the reward!"); 
      }
    }  
  }

public clickDeletePromo(promo_id, code){
  console.log("id code ", promo_id, code); 
  this._store.do({ state: STATE.DELETE_APPLIED_PROMO, payload: { promo_id } });      
}
  
 public clickUseReward(){
  this.is_show_reward_popup = true;  
 }  
}
