import { Injectable } from '@angular/core'; 
import {WebstoreApiService} from '../webstore-api.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { ICartItem,IProductItemVariation,IDiscountItem, ICartRewards, ICartRewardLoyalty } from 'src/app/models/'; 
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private is_logged_in = true; 
  
  constructor(private _api : WebstoreApiService ,
    private _localStorage: LocalStorageService,
  ){

    const loginInfo: any = this._localStorage.retrieveItem('loginInfo');   
    this.is_logged_in = loginInfo && loginInfo.access_token; 
  } 

  public async redeem_user_reward(loyalty_id): Promise<any> {        
      return this._api.api_request( `/cart/reward/discount/apply`,{ loyalty_id }, 'post',  '[CART]redeem_user_reward' , (result) => {           
                  if(result.success){  
                    return {success:true,   data : loyalty_id  };            
                  }else{
                    return {success:false,   data : [] };            
                  }
      });   
  }   

     
  public async apply_promo(promo_code): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/promo/apply`,{ promo_code }, 'post',  '[CART]apply_promo' , (result) => {           

              console.log("apply promo result", result);
         
              if(result.success){  
                return {success:true,   data :  promo_code  };            
              }else{
                return {success:false,   data : [] };            
              }

          });  
    }else{  
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  }  

   
  public async delete_applied_promo(promo_id): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/promo/remove`,{ promo_id }, 'post',  '[CART]delete_applied_promo' , (result) => {           

              console.log("promo deleted result", result);
         
              if(result.success){  
                return {success:true,   data :  promo_id  };            
              }else{
                return {success:false,   data : [] };            
              }

          });  
    }else{  
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  }  

  public async get_user_applied_disounts(): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/discounts/applied`,{  }, 'get',  '[CART]get_user_applied_discounts' , (result) => {           
         
        if(result.success){ 
                let data = result["data"]["discountsAndPromos"]; 
                console.log("applied discounts result: ",result);  
 
                let discounts: IDiscountItem[]   = []; 

                for(let item of data){  
                  let promo : any = item.promo;
                  let discount_item : IDiscountItem  = { id: promo.id , name : promo.name ,  code: promo.code,  type: promo.code != "" ? "coupon" : "promotion" , discount: Number(item.discount_value)};  
                   discounts.push( discount_item );  
                } 
 
                console.log("applied discounts now: ",discounts);                 

                return {success:true,   data : discounts };            
              }else{
                return {success:false,   data : [] };            
              }

          });  
    }else{  
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  }  


  public async get_user_rewards(): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/company/reward/discounts/get`,{  }, 'get',  '[CART]get_user_rewards' , (success) => {  
        
                 console.log("get_user_rewards result:", success);

             let loyalty_list : ICartRewardLoyalty[] = success.data.loyalties.map(x => ({ id : x.loyalty_reward_id, name: x.loyalty_reward_name, discount: Number(x.tradein_discount) , 
              tradein_for : Number(x.tradein_for) || Number(x.tradein_discount)   }) );

             let data :  ICartRewards = {
                  points: success.data.customer_total_loyalty_points ,
                  loyalties: loyalty_list
             };
 

             return {success:true,   data : data  };       
          });  
    }  
  }  
  
  public async empty(): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/empty`,{  }, 'post',  '[CART]cart_empty' , (success) => {          
                try{  
                  console.log("[CART] empty success ",success);
                  return {success:true,   id : -1  };            
                }catch(e){ 
                  console.log("[CART] empty cart here result fail ");
                  return {success:false,   id : -1  };            
                } 
          }); 
      
    }else{  
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  } 



  
  public async get(): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/get`,{ }, 'get',  '[CART] get_cart' , (result) => {          
                try{  
                  console.log("[CART] get list here result success ",result);

                  if(result.success){   
                    
                    let cartItems : ICartItem[] = [];

                    if( result.data[0] && result.data[0].items ){
                       let list = result.data[0].items; 
                        for(let item of list){ 
                          let variants:IProductItemVariation[] = item.related_variants.map(f => ( { id: f.variant_id, sku: f.sku, unit: f.unit, measurement:  f.measurement, weight:  f.measurement + f.unit, amount: f.price  }));       
                          let product : any = item.item.product[0];   
                          let amount : any = Number(item.item_quantity *  item.item.price).toFixed(2);
                          let uuid : any  = uuidv4();

                          
                          
                          let cartItem ={ id    : item.cart_item_id,
                            uuid : uuid, 
                            product_variation_id : item.item.product_variant_id,
                            dispensary_id        : item.dispensary.id,
                            dispensary_name      : item.dispensary.name,
                            brand                : product.brand,
                            thumb                : product.images[0].file.path,
                            title                : product.name, 
                            qty                  : item.item_quantity,  
                            amount               : amount , 
                            measurement          : item.item.measurement + item.item.unit, 
                            variations           : variants
                            };
 
    
                          cartItems.push(cartItem);
                        }  
                      }

                       return {success:true,  data: cartItems  };               
                  }else{ 
                    return {success:false,   id : -1  , message: result.message };            
                  } 
                }catch(e){    
                  return {success:false,   id : -1  };            
                } 
          }); 
      
    }else{   
      return Promise.resolve({success:false,   id : -1  }); 
    }  
  }    


  public async add_multiple( cart :ICartItem[] , replace_cart : number = 1 ): Promise<any> {       
    if (this.is_logged_in){   
      let params : any = { replace_cart : replace_cart,  itemobject : cart.map(x=> { return { product_variant_id : x.product_variation_id, 
        dispensary_id: x.dispensary_id , quantity : x.qty }
       }) };
  
      return this._api.api_request( `/cart/item/add/multiple`, params , 'post',  'add_multiple_item_cart' , (success) => {          
                try{   
                  console.log("[CART] add multiple cart here result success ",success.data); 
                  return {success:true,   data : success.data  };            
                }catch(e){ 
                  console.log("[CART] add multiple cart here result fail ");
                  return {success:false,   id : -1  };            
                } 
          });  
    }else{  
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  } 


  public async add(product_variant_id, dispensary_id, quantity ): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/item/add`,{ product_variant_id, dispensary_id, quantity }, 'post',  'add_item_cart' , (success) => {          
                try{  
                  console.log("[CART] add cart here result success ",success.data[0].cart_item_id);
                  return {success:true,   id : success.data[0].cart_item_id  };            
                }catch(e){ 
                  console.log("[CART] add cart here result fail ");
                  return {success:false,   id : -1  };            
                } 
          }); 
      
    }else{ 
      //console.log("not logged????");
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  } 


  public async delete(cart_item_id ): Promise<any> {       
    if ( this.is_logged_in ) { 
      return this._api.api_request( `/cart/item/remove`,{ cart_item_id }, 'post',  'delete_item_cart' , (success) => {          
                try{  
                  console.log("[CART] deleted successfully ");
                  return {success:true  };            
                }catch(e){ 
                  console.log("[CART] delete cart here result fail ");
                  return {success:false};            
                } 
          }); 
      
    }else{ 
      //console.log("not logged????");
      return Promise.resolve({success:true,   id : -1  }); 
    }  
  } 







}
