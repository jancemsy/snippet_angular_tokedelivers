import { Component, OnChanges, OnDestroy,OnInit, Input } from '@angular/core';
import {   IProductItemSidebar,IProductItemSidebarItem,IProductListFilter } from 'src/app/models/';  
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore';
import { fadeAnimation, listAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
  animations: [listAnimation, fadeAnimation],
})
export class ProductSidebarComponent implements OnInit,OnDestroy {
  @Input() filterOptions: IProductItemSidebar[] = null;
  @Input() filter_dispensary: any = ''; //sepearated by comma 
  
  subcategories :any[] = [];
  subcategory_reference : any;

  constructor(private _store: WebstoreStateService) {   //private _store: WebstoreStateService 
  }


   private filterPage(){  
    let strains : any[] = []; 
    let categories : any[] = [];  
    let brands : any[] = []; 
    let dispensaries : any[] = []; 

  
    for(let item of this.filterOptions){ 
      for(let d of item.category_items){ 
        //console.log("isChecked==>", d.isChecked, item.category_name);


        if(d.isChecked){    
             switch(item.category_name){
                 case "Category":
                   categories.push({id:d.key});
                 break;
                 case "Strain":
                   strains.push({keyword:d.key});
                 break;
                 case "Brand":
                   brands.push({keyword:d.key});
                 break;
                 case "Dispensary":
                   dispensaries.push({id:d.key});
                 break;
             }
        }
      }
    } 

    let term : string = ""; //TODO: integrate this in search at main screen;

    if(this.filter_dispensary !== ''){
        dispensaries.push({ id: this.filter_dispensary});
    }     

    let filter : IProductListFilter = {strains,categories,brands,dispensaries, term};  
    this._store.do({ state: STATE.GET_PRODUCTS, payload: { refresh: true, page : 1, filter : filter } });
  }


  public search(key, item){
    item.category_items.forEach(field => { 
      field.isVisible = ( field.name.toLowerCase().search( key.toLowerCase() ) > -1); 
    });

    //console.log("search ", key,item);
  }


  public clickSidebarItem(item :  IProductItemSidebarItem ){ 
    item.isChecked = !item.isChecked;  
     
    if(item.subcategories && item.subcategories.length > 0){
      if(item.isChecked){
        this.subcategories = item.subcategories;   
      }else{
        this.subcategories = [];
      }       
    }

  
    this.filterPage();    
  } 



  ngOnDestroy() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}
}
