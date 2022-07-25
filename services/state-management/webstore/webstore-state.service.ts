import { Injectable } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; 
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { STATE, IActionResult, IActionParams } from './webstore.model';
import { CartActionService } from './cart/cart-action.service';
import { ProductActionService } from './product/product-action.service';   

@Injectable({
  providedIn: 'root',  
})
export class WebstoreStateService implements OnInit, OnDestroy {
  _states: any = {};  
  _dispatcher = new Subject<IActionParams>();
  _testSubject = new BehaviorSubject(1);
  _testCount = 0;

  sidebar_categories: any = null;

  constructor( 
    private _localStorage: LocalStorageService,
    private _cartAction: CartActionService,
    private _productAction: ProductActionService,    
  ) {     
    this.subscribe(); 
  }

  public test_memory_leak() {  
    return this._testSubject.subscribe(()=>{  
      this._testCount ++;
      setTimeout(() => {         
         console.log("testing interval memory leak" ,this._testCount);           
         this._testSubject.next(1); 
      },2000);  
    });
  }


  public sync(state, callback, takeuntil : any = false) {
    if (!this._states[state]) {
      this._states[state] = new Subject<any>();
    }

    if(takeuntil !== false){ 
      return this._states[state].pipe( takeUntil(takeuntil) ).subscribe(callback);
    }else{
      return this._states[state].subscribe(callback);
    } 
  }

  public do(event: IActionParams) {
    this._dispatcher.next(event);
  }

  public next(state: string, data) {
    //console.log("next state", state);
    
    if (!this._states[state]) {
      this._states[state] = new Subject<any>();
    }

    this._states[state].next(data);
  }

  ngOnDestroy(){
    this._dispatcher.unsubscribe();   
    //_states is unsubscribed per component that access/use it. 
  }
  ngOnInit():void {  
  } 

  private subscribe() {
    this._dispatcher.subscribe( async (event: IActionParams)   => {
          let _state = event.state;
          let _data: any = null;
          let result: IActionResult[] = null; //array and can return multiple states/payloads 

          switch (_state) {
            case STATE.UPDATE_SELECTED_PRODUCT:
              result = await this._productAction.update_selected_product(_state,event.payload );
              break;

            case STATE.SELECT_PRODUCT:
              result = await this._productAction.select_product(_state, event.payload);
              break; 

            case STATE.GET_SELECTED_PRODUCT:
              result = await this._productAction.get_selected_product(_state, event.payload);
              break; 
              
            case STATE.GET_LOCAL_PRODUCTS:
              result = await this._productAction.get_local_products(_state, event.payload);
            break;

            case STATE.GET_PRODUCTS: 
            case STATE.GET_DISPENSARY_PRODUCTS:
              result = await this._productAction.get_products(_state, event.payload,this);
              break;

            case STATE.GET_PRODUCT_SIDEBAR:
              result = await this._productAction.get_sidebar(_state, event.payload);
              break;



              
            case STATE.REDEEM_USER_REWARD: 
                result = await this._cartAction.redeem_user_reward(_state, event.payload,this);
            break;   


            case STATE.GET_USER_REWARD_LIST: 
                result = await this._cartAction.get_user_rewards_list(_state, event.payload,this);
            break;   


            case STATE.DELETE_APPLIED_PROMO: 
              result = await this._cartAction.delete_applied_promo(_state, event.payload,this); 
            break;  

            case STATE.APPLY_PROMO_CODE: 
              result = await this._cartAction.apply_promo(_state, event.payload,this); 
            break;  

            


            case STATE.GET_USER_APPLIED_DISCOUNTS:
              result = await this._cartAction.get_user_applied_discounts(_state, event.payload,this);
            break;   


            case STATE.GET_CART:
              result = await this._cartAction.get_cart(_state, event.payload,this);
              break;

            case STATE.ON_RESULT_GET_CART:
               result = await this._cartAction.on_result_get_cart(_state, event.payload,this);  
              break;

            case STATE.ADD_ITEM_TO_CART:
              result = await this._cartAction.add_cart(_state, event.payload,this);
              break;

            case STATE.DELETE_ITEM_FROM_CART:
              result = await this._cartAction.delete_cart(_state, event.payload,this);
              break;

            case STATE.EMPTY_CART:
              result = await this._cartAction.empty_cart(_state, event.payload,this);
              break;

            case STATE.UPDATE_CART:
              result = await this._cartAction.update_cart(_state, event.payload,this);
              break; 

            default:
              _data = this._localStorage.retrieveItem(_state);

              //throw new Error("Invalid state");
          }

          if (result !== null) {

          for(let item of result){ 
                    _state = item.state;
                    _data = item.payload;

                    //console.log("state---->", _state);

                    let filter: string[] = [
                      STATE.ON_ERROR_GET_LOCAL_PRODUCTS,
                      STATE.ON_ERROR_GET_PRODUCTS,
                      STATE.ON_ERROR_GET_PRODUCT_SIDEBAR,
                    ];

                    if (!filter.includes(_state)) {
                      //do not include errors in the cache.
                      this._localStorage.storeLocal(_state, _data);
                    }

                    this.next(_state, _data);
          }
      }
    });
  }
 

}
