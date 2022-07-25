import { Injectable, Injector } from '@angular/core';
import {WebstoreApiService} from '../webstore-api.service';
import { IProductItem, IProductItemListInfo, IProductItemCannabinoid, IProductTerpeneItem, IProductTerpeneProfileItem, IProductItemSidebar,IProductItemSidebarItem, IProductItemFlavour, IProductItemEffect, IProductItemVariation,IProductItemThumbnail,IProductItemReview } from 'src/app/models/';
import {  Terpenes } from 'src/app/pages/dispensary/product/components/shared/data/product.data.terpenes';


/*API CALL AND DATA MAPPER IN ONE*/

@Injectable({
  providedIn: 'root',
})
export class ProductDataService {
  constructor(private _api : WebstoreApiService) {
  }


  public async get_sidebar(): Promise<any> {
    return this._api.api_request( `/dispensary/nearby`, {location:88556}, 'post', 'get_product_sidebar', (success) => {

      try{
          let data:any = success.data;
          //console.log("ge sidebar data",data);
          //let cannabies_types : any[]  = data[0].map(f => ({ key: f.cannabis_type_id , name : f.name   }) );

          let strain_items :IProductItemSidebarItem[] = data.sidebar_data.strains.map(f =>( {isVisible: true, isChecked: false, name : f.strain , key : f.strain }));
          let strain_sidebar:IProductItemSidebar = { category_name: "Strain", category_items : strain_items,  is_expanded: false };


          let category_items :IProductItemSidebarItem[] = data.sidebar_data.categories.map(f => ({isVisible: true, isChecked: false, key:f.id,  name : f.name, subcategories : f.subcategories   }) );
          let category_sidebar:IProductItemSidebar = {  category_name: "Category", category_items : category_items,  is_expanded: false };


          let brand_items :IProductItemSidebarItem[] =  data.sidebar_data.brands.map(f =>( { isVisible: true, isChecked: false, name : f.brand , key : f.brand }));
          let brand_sidebar:IProductItemSidebar = {   category_name: "Brand", category_items : brand_items,  is_expanded: false };


          let dispensary_items :IProductItemSidebarItem[] = data.dispensaries.map(f => ({isVisible: true,  isChecked: false, key:f.dispensary_id,  name : f.dispensary_name   }) );
          let dispensary_sidebar:IProductItemSidebar = {  category_name: "Dispensary", category_items : dispensary_items,  is_expanded: true };
          let sidebar : IProductItemSidebar[] =  [dispensary_sidebar,category_sidebar,strain_sidebar,brand_sidebar];

          return {success:true,   data :  sidebar  };

      }catch(e){
        console.log("sidebar error", e);
        return {success:false,   data : { error : "error extracting get sidebar data"}  };
      }

      });
  }

  private getRandomTerpenseColor() : string{
    let colors : string[] = Array("red","blue","green","yellow","orange","blue","violet","black");
    let min : number = 0;
    let max : number = colors.length;
    let random =  min + Math.floor((max - min) * Math.random());

    return colors[random];
  }

  public async get_products(page : number = 1, filter = {} , by_dispensary = false  ,  limit : number = 8): Promise<any> {
    return this._api.api_request( `/product/filter?page=${page}&limit=${limit}`, filter, 'post', 'get_store_products', (success) => {
             try{
              console.log("[products/filter data]",success);
              let list : any = success.data[0].dispensaries.data;
              let products: IProductItem[] = [];
              let page : any = success.data[0].dispensaries;
              let listInfo:  IProductItemListInfo = {current_page: page.current_page,  total: page.total,last_page : page.last_page , filter : filter  } ;



                    for(let item_list of list){
                        let  random_product_index =  Math.floor(( (item_list.products.length -1) - 0) * Math.random());
                        let item = item_list.products[random_product_index];
                        let count = 1;

                        if(by_dispensary){
                          count = item_list.products.length;
                        }

                        // Hotfix when products is empty via filter
                        if (!item) {
                          continue;
                        }

                       for(let  ii = 0; ii < count; ii++ ){

                        if(by_dispensary){
                          item = item_list.products[ii];
                        }

                        let variants:IProductItemVariation[] = item.variants.map(f => ( { id: f.id, sku: f.sku, unit: f.unit, measurement:  f.measurement, weight:  f.measurement + f.unit, amount: f.price  }));
                        let thumbnails: IProductItemThumbnail[] = item.images.map(f => { return { image:  f.file.path, selected : false };  });
                        let review:IProductItemReview = item.reviews.length > 0 ? item.reviews.map(f => ( { name: f.user.first_name , message: f.review, avatar: f.user.avatar_url  } ))[0] : null;
                        let cannabinoids : IProductItemCannabinoid[] = item.batches[0].canabinoids.map(f => (  {  percentage: f.batch_canabinoid.percentage, name: f.abbreviation } ));
                        let outer_terpenes : any[] = item.batches[0].terpenes.map(f => ( f.profiles.map(n => ( { flavor: n.flavor, flavor_score: parseInt(n.flavor_score), effect : n.effect, effect_score: parseInt( n.effect_score ) } )) ));
                        let terpene_profiles : IProductTerpeneProfileItem[] = [];
                        let thc : number = item.batches[0].thc;
                        let cbd : number = item.batches[0].cbd;


                        //TODO: the color per terpene , currently it is random
                        let terpenes : IProductTerpeneItem[] = item.batches[0].terpenes.map(f => ( { name: f.name, color: this.getRandomTerpenseColor() }));

                        for(let array_item of outer_terpenes){  terpene_profiles =  terpene_profiles.concat(array_item); }

                        terpene_profiles = terpene_profiles.filter(n => n.flavor && n.flavor !== '' && n.flavor_score > 0 );   //filter invalid data

                        let flavours : IProductItemFlavour[] = terpene_profiles.sort((a, b) => b.flavor_score -  a.flavor_score).map(f => {
                          //check for availability of the icon
                          let matched: number = Terpenes.findIndex( t => (  t.Flavor_Type_1 == f.flavor ||  t.Flavor_Type_2 == f.flavor || t.Flavor_Type_3 == t.Flavor_Type_3 ) );

                          //default icon if not recognized is 'Allspice.svg'
                          return { icon: matched == -1 ? "Allspice" : f.flavor , name: f.flavor, score: f.flavor_score };
                        } );


                        flavours = flavours.splice(0,3); //top 3  filtered flavours


                        //console.log("check top flavours", flavours);
                        let effects : IProductItemEffect[] = terpene_profiles.sort((a, b) => b.effect_score - a.effect_score).splice(0,5).map(f => ( {    name: f.effect, score: f.effect_score })); //top 5 effects


                        thumbnails[0].selected = true;
                        products.push({
                            product_id: item.id,
                            dispensary_id: item_list.id,
                            dispensary_name: item_list.dispensary_name,
                            name:  item.name,
                            brand: item.producer,
                            thumbnails:  thumbnails ,
                            image: thumbnails[0].image,  //focused image
                            variations: variants,
                            selected_variation_index: 0,
                            description: item.description,
                            thc: thc,
                            cbd: cbd,
                            review: review,
                            cannabinoids: cannabinoids ,
                            terpenes: terpenes,
                            flavours: flavours,
                            effects: effects,
                          });

                        }
                  }



              return {success:true,   data :  {products: products, info :  listInfo }  };
          }catch(e){
            console.log("error extracting",e);
            return {success:false,   data :  { error: "error extracting the data" }  };
          }
    });
  }


}
