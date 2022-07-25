import { Injectable } from '@angular/core';
import { STATE, IActionResult } from '../webstore.model';
import { IProductListFilter } from 'src/app/models/';  
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service'; 
import { ProductDataService } from './product-data.service';   
 
@Injectable({
  providedIn: 'root',
})
export class ProductActionService { 

  constructor(  
    private _localStorage: LocalStorageService , 
    private _productDataService: ProductDataService
  ) {}
 

  //this is duplicate with select_product but this will come in handy next if we add custom logic for update selected product
  public update_selected_product(state: string, payload?: any):Promise< IActionResult[]> {
    let _payload = payload.product;    
    return new Promise<IActionResult[]>( (resolve) =>{ 
      resolve([{ state: STATE.ON_RESULT_SELECTED_PRODUCT, payload: _payload }]);  
    });
  }


  public select_product(state: string, payload?: any):  Promise<IActionResult[]> {
    let _payload = payload.product;    
    return new Promise<IActionResult[]>( (resolve) =>{
      resolve([{ state: STATE.ON_RESULT_SELECTED_PRODUCT, payload: _payload }]); 
    });
  }
 
  public  get_selected_product(state: string, payload?: any):  Promise<IActionResult[]> {
      let _payload =   this._localStorage.retrieveItem(STATE.ON_RESULT_SELECTED_PRODUCT);  
      return new Promise<IActionResult[]>( (resolve) =>{
        resolve([{ state: STATE.ON_RESULT_SELECTED_PRODUCT, payload: _payload }]); 
      });
  }
 


  public async get_local_products(state: string, payload?: any): Promise<IActionResult[]> {
    let _data = this._localStorage.retrieveItem(STATE.ON_RESULT_GET_PRODUCTS); //get cache  
    //console.log("LOCAL CACHE IS ",_data);

    return new Promise<IActionResult[]>( (resolve) =>{ 
          if (_data) {   
            resolve([{ state:STATE.ON_RESULT_GET_PRODUCTS,  payload: _data }]); 
        }else{
            resolve([{ state:STATE.ON_ERROR_GET_LOCAL_PRODUCTS,  payload: _data }]);
        } 
      }); 
  }



  public async get_products(state: string, payload?: any, _stateService ?: any): Promise<IActionResult[]> { 
    let _data = this._localStorage.retrieveItem(STATE.ON_RESULT_GET_PRODUCTS); //check cache 
    let is_refresh: boolean = payload && payload.refresh === true ? true : false;


    //if the request is to serve the live data, let us fetch local cache first, till we have an update from the server. this will help prefill the content and avoid waiting time.  
    //do not use the cache if its from dispensary page, because it will use different set of data 
    if(is_refresh === true && state !== STATE.GET_DISPENSARY_PRODUCTS){  
        //TODO: use this caching code when we have our product list fixed by inventory not by dispensary with set of products.  
        //for now ill display the product in random index array to prevent this issue -> discrepancy issue with the display when we refresh the page etc . 
        //_stateService.do({ state: STATE.GET_LOCAL_PRODUCTS, payload } );  
    } 

    _stateService.next(STATE.ON_GET_PRODUCTS_LOADING, payload );
 
  
    return new Promise<IActionResult[]>( (resolve) =>{ 
          if (!_data || is_refresh) {   
              let defaultFilter : IProductListFilter = { strains:[], categories:[], brands:[], dispensaries : [], term:"" };    
              this._productDataService.get_products(payload.page, payload.filter ? payload.filter :defaultFilter , state === STATE.GET_DISPENSARY_PRODUCTS ? true : false).then(result =>{         
                console.log("get product result is ", result.success); 
                if(result.success){    
                  resolve([{ state: STATE.ON_RESULT_GET_PRODUCTS,  payload: result.data }]);
                }else{
                  resolve([{ state: STATE.ON_ERROR_GET_PRODUCTS,  payload:result.errors }]);
                } 
              });   
          }else{
              resolve([{ state: STATE.ON_RESULT_GET_PRODUCTS,  payload: _data }]);
          } 
     });
  }

  
  public get_sidebar(state: string, payload?: any): Promise<IActionResult[]> {
    let result_state : string = STATE.ON_RESULT_GET_PRODUCT_SIDEBAR;
    let _data = this._localStorage.retrieveItem(result_state); //check cache     
    let is_refresh: boolean = payload && payload.refresh === true ? true : false;


    return new Promise<IActionResult[]>( (resolve) =>{
        if (!_data || is_refresh) { 
            this._productDataService.get_sidebar().then(result =>{
            if(result.success){    
              resolve([{ state: result_state,  payload: result.data}]);
            }else{
              resolve([{ state: STATE.ON_ERROR_GET_PRODUCT_SIDEBAR,  payload:result.errors }]);
            } 
          }); 
        }else{
          resolve([{state: result_state,  payload: _data}]);
        }
     }); 
  }

}
