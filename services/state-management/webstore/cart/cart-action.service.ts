import { Injectable } from '@angular/core';
import { ICartItem} from 'src/app/models/'; 
import { STATE, IActionResult } from '../webstore.model';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service'; 
import { CartDataService } from './cart-data.service';  
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CartActionService {
  private is_logged_in : boolean = false; 

  constructor( 
    private _localStorage: LocalStorageService , 
    private _cartDataService: CartDataService
  ) {

    const loginInfo: any = this._localStorage.retrieveItem('loginInfo');   
    this.is_logged_in = loginInfo && loginInfo.access_token; 
  }


  public async apply_promo(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
    let _data  = [];
  
    if(this.is_logged_in){ 
      _data  = await  this._cartDataService.apply_promo( payload.promo_id);  
    } 
     

    return new Promise<IActionResult[]>( (resolve) =>{  
       resolve( [ { state: STATE.ON_RESULT_APPLY_PROMO_CODE,  payload: _data}   ] );  
      } );  
  }
 
  public async delete_applied_promo(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
    let _data  = [];
  
    if(this.is_logged_in){ 
      _data  = await  this._cartDataService.delete_applied_promo( payload.promo_id);  
    } 
     

    return new Promise<IActionResult[]>( (resolve) =>{  
       resolve( [ { state: STATE.ON_RESULT_DELETE_APPLIED_PROMO,  payload: _data}   ] );  
      } );  
  }


  public async redeem_user_reward(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
    let _data  = [];
 
    if(this.is_logged_in){ 
      _data  = await  this._cartDataService.redeem_user_reward(payload.reward_id);  
    } 
     
    return new Promise<IActionResult[]>( (resolve) =>{  
       resolve( [ { state: STATE.ON_RESULT_REDEEM_USER_REWARD,  payload: _data}   ] );  
      } );  
  }


  

  public async get_user_applied_discounts(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
    let _data  = [];

    if(this.is_logged_in){ 
        _data  = await  this._cartDataService.get_user_applied_disounts();  
    } 

    return new Promise<IActionResult[]>( (resolve) =>{  
       resolve( [ { state: STATE.ON_RESULT_GET_USER_APPLIED_DISCOUNTS,  payload: _data}   ] );  
      } ); 

  }
 
   
  public async get_user_rewards_list(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
    let _data  = null;

    if(this.is_logged_in){ 
       _data  = await  this._cartDataService.get_user_rewards();  
    } 
 
    return new Promise<IActionResult[]>( (resolve) =>{  
       resolve( [ { state: STATE.ON_RESULT_GET_USER_REWARD_LIST,  payload: _data}   ] );  
      }); 

  }
 

  public async empty_cart(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {  
    let cart = [];

     if(this.is_logged_in){
           let result  = await  this._cartDataService.empty(); 
           if(result.success){
            cart = [];  
            this.setCart(cart);  
           } 
     }else{        
          this.setCart(cart);  
     } 
     
     let count : number  = cart.length;   
     let _data = this._cartData(cart);  


    return new Promise<IActionResult[]>( (resolve) =>{  
      resolve(  
        [ { state: STATE.ON_RESULT_EMPTY_CART,  payload: _data},  
          { state: STATE.ON_RESULT_GET_CART,  payload: _data},  
          { state: STATE.ON_CART_COUNT, payload :  this._cartCount(count)  }  ] );  }); 

  }

  public async delete_cart(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {   
   let cart = this.getCart(); 

   let indexMatch = cart.findIndex(x => x.product_variation_id == payload.product_variation_id); 


   let is_success = true; 
   if(this.is_logged_in){
     let _result = await this._cartDataService.delete(cart[indexMatch].id);   
     is_success = _result.success; 
   }  

   if(is_success){ 
    cart.splice(indexMatch, 1);    
   }else{
     ///TODO: figure what to do later if api fails to delete the item. 
   }

   let _data = this._cartData(cart);  
   this.setCart(cart); 

 return new Promise<IActionResult[]>( (resolve) =>{  
   resolve(  
     [ { state: STATE.ON_RESULT_GET_CART,  payload: _data}, 
       { state: STATE.ON_RESULT_DELETE_ITEM_FROM_CART,  payload: _data}, 
       { state: STATE.ON_CART_COUNT, payload :  this._cartCount(_data.count)  } ] );  }); 
}
 

 

public update_cart(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {     
  let cart : ICartItem[]  = this.getCart();      

  //TODO: TRANSFER THIS TO DATA CLASS  
  let index = cart.findIndex(x => x.uuid == payload.uuid);   
  cart[index].product_variation_id = payload.variation.id; 
  cart[index].qty =  payload.qty;
  cart[index].amount = Number(payload.variation.amount * cart[index].qty).toFixed(2);
  cart[index].measurement =  payload.variation.measurement + payload.variation.unit;   
    

  let _data = this._cartData(cart);  
  this.setCart(cart); 

 return new Promise<IActionResult[]>( (resolve) =>{  
   resolve(  
    [ { state: STATE.ON_RESULT_GET_CART,  payload: _data},  
      { state: STATE.ON_CART_COUNT, payload :  this._cartCount(_data.count) } ] );  }); 
  }

  private async sync_ids(list){
    let _latest_cart : ICartItem[]  = this.getCart();
    for(let item of _latest_cart){    
      item.id =  list.filter( x =>  x.product_variant_id === item.product_variation_id  )[0].id; 
     }  
     this.setCart(_latest_cart);       
  }

  //sync cart from local 
  private async sync_cart() :  Promise<any>{ 
    let _latest_cart : ICartItem[]  = this.getCart();
    let result = await this._cartDataService.add_multiple(_latest_cart);     
    if(result.success){       
      this.sync_ids(result.data[0]);
      this._localStorage.storeLocal("is_cart_local_updated", -1);  
    }
  }


  public async add_cart(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {    
     let cart : ICartItem[]  = this.getCart();
     let isError : boolean =  cart && cart.length > 0 && cart[0].dispensary_id !== payload.product.dispensary_id ? true : false; 
     
     if(payload.new_cart && payload.new_cart === true ){
       cart = [];              
       isError = false; 
     }
 
     if( isError === true){
            return new Promise<IActionResult[]>( (resolve) =>{ 
              resolve( [{ state: STATE.ON_CART_DISPENSARY_ERROR, payload: payload }] );
            });
     }else{   
          let uuid : any  = uuidv4(); 
          let cartItem : ICartItem = { id : -1,
            uuid : uuid, 
            product_variation_id : payload.variation.id, 
            dispensary_id : payload.product.dispensary_id, 
            dispensary_name : payload.product.dispensary_name, 
            brand:  payload.product.brand,
            thumb: payload.product.image, 
            title: payload.product.name,
            qty : 1, 
            amount: payload.variation.amount,      
            measurement: payload.variation.measurement + payload.variation.unit,
            variations : payload.product.variations 
            }; 
  
          cart.push(cartItem);  
          let _data = this._cartData(cart);            
          this.setCart(cart);    
          let  _latest_cart : ICartItem[] = this.getCart();  
 
          if(this.is_logged_in){ 
              let result  = await this._cartDataService.add_multiple(_latest_cart);   
              if(result.success){       
                this.sync_ids(result.data[0]);
              }
          }else{
              this._localStorage.storeLocal("is_cart_local_updated", 1); 
          }
          


          return new Promise<IActionResult[]>( (resolve) =>{  
            resolve(  
              [ { state: STATE.ON_RESULT_GET_CART,  payload: _data}, 
                { state: STATE.ON_RESULT_ADD_ITEM_TO_CART,  payload: _data}, 
                { state: STATE.ON_CART_COUNT, payload :  this._cartCount(_data.count) } 
              
              ] );  });  
     } 

  }


  public on_result_get_cart(state: string, payload?: any , _stateService? :any): Promise<IActionResult[]> {  
    let cart : any = payload;  
    this.setCart(cart);      
    let _data = this._cartData(cart);   
        
    return new Promise<IActionResult[]>( (resolve) =>{  resolve( [ { state: STATE.ON_RESULT_GET_CART,  payload: _data },
      {  state: STATE.ON_CART_COUNT, payload :  this._cartCount(_data.count)  } ] );  });   
  }
  
  public get_cart(state: string, payload?: any, _stateService? :any): Promise<IActionResult[]> {
    let result_state : string = STATE.ON_RESULT_GET_CART;        
    let is_refresh : boolean = payload && payload.refresh ? true : false; 


    if(this.is_logged_in && this._localStorage.retrieveItem("is_cart_local_updated") === 1){ 
      this.sync_cart();        
     }else{      

      //it is wrong to call getcart api anywhere the pages all the time. We should cache whenever needed and use cache data for performance purposes    
      if(this.is_logged_in && this._localStorage.retrieveItem("is_cart_online_updated") !== 1 ){
        this._cartDataService.get().then(result =>{ 
          if(result.success){  
                console.log("get cart from api", result.data);                
                _stateService.do({state: STATE.ON_RESULT_GET_CART,  payload :  result.data }); 
                this._localStorage.storeLocal("is_cart_online_updated", 1);
          }else{ 
              if(result.errors && result.errors[0] === "Invalid access token!"){ 
                _stateService.next(STATE.ON_SESSION_EXPIRED, payload );
              }
          } 
        });  
      }  
    }


    let  cart : ICartItem[] = this.getCart(); 
    let _data = this._cartData(cart);     
     
    return new Promise<IActionResult[]>( (resolve) =>{  resolve( [ { state: result_state,  payload: _data},
      {  state: STATE.ON_CART_COUNT, payload :  this._cartCount(_data.count)  } ] );  }); 
  }


  
  private getCart() : ICartItem[] { 
    let cart : ICartItem[] = this._localStorage.retrieveItem("_cart") || [];  
    return cart; 
  }

  private _cartCount(count){  
    let is_new : boolean = (this._localStorage.retrieveItem('_cart_count') !== count)  ? true : false;  
    this._localStorage.storeLocal('_cart_count', count === 0 ? -1 : count); 

    return  { count: count, is_new: is_new} ;
  }
  private _cartData(cart){
    let total_amount : any = 0; 
     
    for(let item of cart){  
      total_amount +=  Number(item.amount);
     } 


     total_amount = Number(total_amount).toFixed(2);

     let count : number  = cart.length; 
     return { cart, count,  total_amount };      
  }

  private setCart(cart : any){
    this._localStorage.storeLocal("_cart",cart); 
  }
 
}
