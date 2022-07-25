import { Injectable } from '@angular/core'; 
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service'; 
import { ApiService} from 'src/app/services/core/api.service';
import { IProduct, IProductBatch, IProductCategory, IProductSubCategory, IProductVariation,Product, Batch, IProductBatchProfile } from 'src/app/models';  
import { WebStoresService } from '../../../../services/web-stores/web-stores.service'; 
 
@Injectable({
  providedIn: 'root'
})
export class ProductApiService{ 
  private userinfo;      

  constructor(
    private _api: ApiService,
    private _localStorage: LocalStorageService,
     private webstoreService: WebStoresService,
  ) { 
      this.userinfo =  this._localStorage.retrieveItem('loginInfo');        
   } 



   public async delete_variation(variation_id){ 
    return this._api_request(`/company/product/variant/${variation_id}/delete`,{}, "delete", "delete variant"); 
   }

   public async delete_batch(batch_id){ 
    return this._api_request(`/company/product/batch/${batch_id}/delete`,{}, "delete", "delete batch");  
   }


   //add/update batch profile
   public async update_batch_profile(f: IProductBatchProfile){
    let api_url : string, request_type: string; 
    let params  =  {  id : f.id , batch_id : f.batch_id,  json_data :  JSON.stringify(f) };
    if(f.id === -1 ){  //new?? 
      api_url  =  `/company/product/batch/profile/new`;   
      request_type = "post";
    }else{ 
      api_url  = `/company/product/batch/profile/update`;  
      request_type = "put";
    }
 
    return this._api_request(api_url, params, request_type ,  "add/edit batch profile");        
   }


   
   //add/update batch
   public async update_batch(f : IProductBatch){
    let api_url : string, request_type: string; 
    let params : any = { 
      id: f.id, 
      product_id: f.product_id,
      number:  f.batch_number,
      date: f.batch_date,
      expiration_date: f.exp_date,
      status: f.status
    };            

    if(f.id === -1 ){  //new?? 
      api_url  =  `/company/product/batch/new`;  
      request_type = "post";
    }else{ 
      api_url  = `/company/product/batch/update`; 
      request_type = "put";
    }
 
    return this._api_request(api_url, params, request_type ,  "add/edit batch");         
   }



   //add/update variation
   public async update_variation(f : IProductVariation){ 
    let api_url : string, request_type: string; 
    let params : any = {
      id: f.id, 
      product_id: f.product_id,
      package_number: f.metrc_tag,
      sku: f.sku_number,
      measurement: f.measurement,
      unit: f.units,
      price: f.price
    };                       

    if(f.id === -1 ){  //new?? 
      api_url  =  `/company/product/variant/new`;
      request_type = "post";
    }else{ 
      api_url  = `/company/product/variant/${f.id}/update`; 
      request_type = "put";
    }
 
    return this._api_request(api_url, params, request_type ,  "add/edit variation");          
   }


   public async upload_product_image(form :any ){
    return  new Promise(resolve =>{    
       this.webstoreService.uploadProductLogo(form).toPromise().then(successResponse  => {
          //console.log("upload product image", successResponse);   
          resolve(successResponse);     
       }).catch(errorResponse =>{          
        //console.log("upload product image", errorResponse);   
        resolve({success:false, errors : this.convertErrorMessages(errorResponse) });
      });    
    });
   }


   //handle add or update product
   public async update( f : IProduct): Promise <any>{ 
    let api_url : string, request_type: string; 
    let params : any = {
      id: f.id, 
      company_id: this.userinfo.user_company_id, 
      name: f.product_name,
      category_id: f.category_id,
      sub_category_id: f.sub_cateogry_id,
      producer: f.producer,
      supplier_name: f.supplier_name,
      supplier_license_number: f.supplier_license,
      cannabis_type: f.cannabis_type,
      medical_only: f.is_medical,
      strain: f.strain,
      description: f.description
    };            

    if(f.id === -1 ){  //new?? 
      api_url  =  `/company/product/new`;
      request_type = "post";
    }else{ 
      api_url  = `/company/product/update`; 
      request_type = "put";
    }
 
    return this._api_request(api_url, params, request_type ,  "add/edit product");           
   }





   public async get_product(product_id : number): Promise <any>{    
    return this._api_request(`/company/product/${product_id}/get`,{}, "get" ,  "get_product", success => {
      //console.log("get product successResponse", success); 

      let result : any = success.data;
        let product: IProduct = new Product(); 
            product.id = result.id; 
            product.category_id = result.category_id;
            product.description = result.description;
            product.is_medical = result.medical_only ? true : false;
            product.product_name = result.name; 
            product.strain = result.strain;
            product.sub_cateogry_id = result.sub_category_id;
            product.supplier_license = result.supplier_license_number;
            product.supplier_name = result.supplier_name;  
            product.producer = result.producer; 
            product.product_image = result.image  && result.image.path ?  result.image.path  : ""; 
            product.cannabis_type = result.cannabis_type; 
 
            product.variations = result.variants.map(f => { 
                                                              let item:IProductVariation =   { id: f.id, 
                                                                    product_id: f.product_id,
                                                                    metrc_tag : f.package_number,
                                                                    sku_number : f.sku ,
                                                                    measurement: f.measurement,
                                                                    units  : f.unit,
                                                                    price: f.price 
                                                                  };  
                                                              return item; 
                                                     } );  

            product.batches = result.batches.map(f => {  
                                                      let item:IProductBatch = new Batch(f.product_id); 
                                                      item.id = f.id,
                                                      item.product_id = f.product_id,       
                                                      item.batch_number = f.number,
                                                      item.batch_date = f.date, 
                                                      item.exp_date =  f.expiration_date,
                                                      item.status = f.status; 


                                                      //item.batch_profile = f.profile_json;
                                                      //translate profile json to batch profile
                                                      if(f.profile_json.length > 0){
                                                        let _profile : any  = f.profile_json[0];

                                                        item.profile_json = JSON.parse(_profile.json_data);
                                                        item.batch_profile = JSON.parse(_profile.json_data);
                                                        item.batch_profile.id = _profile.id;  //update the latest id  of this json profile record. 
                                                      }

                                                      return item; 
                                             } );  

           //console.log("-000000batches ", product.batches); 

           return {success:true,   data : product };
    });        
 } 

 
   public async get_categories() : Promise <any>{    
    return this._api_request(`/company/product/categories`,{}, "get" ,  "get_categories", success => { 
      //console.log("get_cat successResponse", success); 
      let data:any[] = success.data.categories.map(x => { 
       let subcat:IProductSubCategory[] = !x.subcategories ? [] : x.subcategories.map(y => { return {id : y.id, category_id : y.category_id, name : y.name } }); 
       let item:IProductCategory  = { id : x.id, name : x.name , subcategories : subcat };  
       return item; 
      } ); 

      //console.log("final categories is ", data); 
      return {success:true,   data : data }; 
    }); 
   }
  

   private _api_request(url,params, request_type, module, _success_callback : any = null) :Promise<any>{
    let request : any; 
    switch(request_type){       
      case "put": request = this._api.put(url,params); break;
      case "get": request = this._api.get(url,params); break;
      case "delete": request = this._api.delete(url,params); break; 
      default: request = this._api.post(url,params); break;
    }

    if(_success_callback === null){
      _success_callback = (success) => {  
         //console.log(module + " success", success);        
         return success;     
      };
    }

    return Promise.resolve( request.toPromise().then(_success_callback).catch((error) => {
      //console.log(module +" error ", error);
      let _errors : any[] = this.convertErrorMessages(error);
      return { success:false, errors : _errors } } )); 
  }

 
 
  private convertErrorMessages(objs){ 
    console.log("error 000> ", objs);
    let arr = []; 
    let errors = (objs.errors) ?  objs.errors : objs.message;  
    for(let key in errors){  
      let msg : string = errors[key][0]; 
      msg = msg.replace("must be a string","is required"); 
      arr.push({ "field" : key , "message" : msg});
    }  
    return arr; 
  } 
  


}