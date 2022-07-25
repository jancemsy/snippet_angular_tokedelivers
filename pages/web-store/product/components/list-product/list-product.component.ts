import { Component, OnInit,OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { IProductItemSidebar, IProductItem,IProductItemListInfo,IProductListFilter } from 'src/app/models/'; 
import {WebstoreStateService, STATE } from 'src/app/services/state-management/webstore'; 
import { Subscription } from 'rxjs';
import { fadeAnimation } from 'src/app/shared/animations';  

@Component({
  selector: 'app-store-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
  animations: [fadeAnimation],
})
export class ListProductComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  is_preview: boolean = false;
  product: IProductItem = null;
  products: IProductItem[] = null;
  listInfo: IProductItemListInfo = null;
  filterOptions: IProductItemSidebar[] = null;
  pages:number[] = [];
  error_display: string = '';
  showSmallLoader : boolean = false;

  @Input() title: any = "All Products";
  @Input() filter_dispensary: any = ''; //sepearated by comma 
  

  constructor( 
    private _store: WebstoreStateService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void { 
    //memory leak test////////////////////////////////////////
    //this.subscription.add( this._store.test_memory_leak() );  
    //this._store.test_memory_leak();
    //memory leak test////////////////////////////////////////  

    this.subscription.add(
      this._store.sync(STATE.ON_ERROR_GET_PRODUCTS, (data) => {
        //TODO: handle error get products here
      })
    );

    this.subscription.add(
      this._store.sync(STATE.ON_ERROR_GET_PRODUCT_SIDEBAR, (data) => {
        //TODO: handle error get product categories here
      })
    );

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_PRODUCT_SIDEBAR, (data) => { 
        this.filterOptions = data;
      })
    );
 

    this.subscription.add(
      this._store.sync(STATE.ON_GET_PRODUCTS_LOADING, (data) => {     
        if(this.products !== null){ //only show this loader when there is an existing content in the product list 
          this.showSmallLoader = true; 
        }
      }) 
    );

    this.subscription.add(
      this._store.sync(STATE.ON_RESULT_GET_PRODUCTS, (data) => {   
        this.products = data.products;  
        this.listInfo = data.info;
        this.pages = [];
        this.error_display = ''; 
        this.showSmallLoader = false;

        if(this.products.length === 0){ 
           this.error_display = 'No products found in this criteria.';
        }else{ 
          let start : number = Math.floor(Math.floor(this.listInfo.current_page /5) * 5) ; 
          start =  start == 0 ? 1 : start;
          for(let i = start  ; i < (start + 5) && i < this.listInfo.last_page;  i++ ){
              this.pages.push(i);
          }    
        } 
      }) 
    );
 
    this._store.do({ state: STATE.GET_PRODUCT_SIDEBAR, payload: {refresh : false } });     
   
    if(this.filter_dispensary != ''){
         let filter : IProductListFilter = {brands: [], strains : [],categories:[],term : '',  dispensaries : [ { id :  this.filter_dispensary }] };
         this._store.do({ state: STATE.GET_DISPENSARY_PRODUCTS, payload: { refresh: true, page : 1, filter : filter   } }); 
    }else{
         this._store.do({ state: STATE.GET_PRODUCTS, payload: { refresh: false, page : 1 } });
    } 
  }


  public search(search){ 
    let _filter = this.listInfo.filter;
    _filter.term = search;  
    this._store.do({ state: STATE.GET_PRODUCTS, payload: { refresh: true, page : 1 , filter : _filter} });  
  }


  public clickChangePage(page){  
    this._store.do({ state: STATE.GET_PRODUCTS, payload: { refresh: true, page : page } });
  }

  public clickOpenInfo(item: IProductItem) {
    this.product = item;
    this.is_preview = true;
    this._store.do({
      state: STATE.SELECT_PRODUCT,
      payload: { product: this.product },
    });
  }

  public sortProductList(){
    this.error_display = 'No api available to perform this action.';
  }

  public popupDetailInfo(state) {
    if (state === 'close') {
      this.is_preview = false;
    }
  }
}
