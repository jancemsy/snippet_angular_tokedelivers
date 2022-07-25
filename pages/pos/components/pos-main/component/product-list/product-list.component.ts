import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, mergeMap, takeUntil } from 'rxjs/operators';
import { IPosProductItem } from 'src/app/models';
import { PosProductsService } from 'src/app/services/pos/pos-main/pos-products.service';
import { listAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [listAnimation],
})
export class ProductListComponent implements OnInit {

  private _dispensary_id = 1;
  private _unsubscribe$ = new Subject<any>();
  private _subscription: Subscription;
  private _products: Array<IPosProductItem> = [];
  private _filtered: any = {
    searched: '',
    category: ''
  };

  public keyUp = new Subject<KeyboardEvent>();
  public products: Array<IPosProductItem>;
  public pOtions:any = [
    { text: 'All Products', value: '' },
    { text: 'Flower', value: 'Flower' },
    { text: 'Pre-Roll', value: 'Pre-Roll' },
    { text: 'Vaporizer', value: 'Vaporizer' },
    { text: 'Concentrate', value: 'Concentrate' },
    { text: 'Edibles', value: 'Edibles' },
    { text: 'Tincture', value: 'Tincture' },
    { text: 'Topicals', value: 'Topicals' },
    { text: 'Accessories', value: 'Accessories' },
  ];

  // load more feature
  public display:any = {
    max: 20,
    index: 1
  };

  constructor(
    private _posProductService: PosProductsService,
    private ref: ChangeDetectorRef
  ) {

    // this is for search
    this._subscription = this.keyUp.pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(300),
      )),
    ).subscribe(keyword => {
      this._filtered.searched = keyword;
      this._onFilter();
    });
  }

  ngOnInit(): void {
    this._posProductService.setObserver(this._unsubscribe$);
    this._initProducts();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._subscription.unsubscribe();
  }

  @HostListener('scroll', ['$event']) onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {

      // we also need to validate if products were already displayed
      // or no need to display more if current display is less than max
      let displays = this.display.index * this.display.max
      if (this.products.length < this.display.max || this.products.length >= displays) {
        return
      }

      console.log("[POS][PRODUCT_LIST_BOTTOM] reached", displays, this.products.length);
      this.display.index++;
      this._onFilter();
    }
  }

  public onProductOptionChange(option:any) {
    this._filtered.category = option.value;
    this._onFilter();
  }

  // PRIVATE ESSENTIAL FUNCTIONS FOR PRODUCT LIST --------------------------------

  // initialize products
  private async _initProducts() {
    try {
      this._products = await this._posProductService.getStateProductData(this._dispensary_id);
      this._onFilter();
      this.ref.detectChanges();

    // handle any errors
    } catch (e) {
      console.error('[POS][INIT_PRODUCTS] error', e);
    }
  }

  /**
   * Function to filter products
   */
  private _onFilter() {
    console.log("[POS][FILTER] init")
    const { searched, category } = this._filtered;
    this.products =  this._products.filter((product:IPosProductItem, index) => {
      // prioritize category filter
      if (category && category != '' && product.category.name != category) {
        return false;
      }

      // next search filter
      if (product.name.indexOf(searched) < 0) {
        return false;
      }

      // last control items
      if (this.display.max * this.display.index <= index) {
        return false;
      }

      return true;
    });
    this.ref.detectChanges();
  }


}
