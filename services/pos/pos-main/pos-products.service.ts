import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPosProductItem, IPosProductItemVariation, IPosProductItemFlavour, IPosProductItemEffect, IPosProductItemCannabinoid, IPosProductTerpeneItem } from 'src/app/models';
import { ApiService } from '../../core/api.service';
import { LocalStorageService } from '../../utilities/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PosProductsService {

  private observer: Observable<any>;


  // STATE ------------------------------------------------------------
  // The main purpose for this is to have control over the products that was stored
  // Especially when there are changes of the products that was triggered in other components
  private _sProducts$ = new BehaviorSubject<IPosProductItem[]>(null);

  get getStateProducts(): Observable<IPosProductItem[]> {
    return this._sProducts$;
  }

  setStateProducts(products: Array<IPosProductItem>) {
    this._sProducts$.next(products);
  }

  constructor(
    private api: ApiService,
    private _localStorage: LocalStorageService
  ) { }

  // API ----------------------------------------------------------------
  getPosDispensaryProducts(id: number) {
    return this.api.get(`/pos/dispensary/${id}/products`);
  }


  // HELPERS -------------------------------------------------------------

  // NOTE! Important to set this to use any helper below
  public setObserver(observer: Observable<any>) {
    this.observer = observer;
  }

  public getStateProductData(dispensary_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.getStateProducts
          .pipe( takeUntil(this.observer) )
          .subscribe(async (successResponse: Array<IPosProductItem>) => {
            if (!successResponse) {
              let products = await this.fetchProductsData(dispensary_id)
              this.setStateProducts(products);
              return resolve(successResponse);
            }
            console.log('[POS_PROD_SERVICE][STORED_PRODUCTS] get success', successResponse);

            resolve(successResponse);
          }, reject);
      } catch(e) {
        reject(e);
      }
    });
  }

  public fetchProductsData(dispensary_id: number, ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getPosDispensaryProducts(dispensary_id)
        .pipe( takeUntil(this.observer) )
        .subscribe((successResponse: any) => {
          console.log('[POS_PROD_SERVICE][PRODUCTS_BY_DISPENSARY] success', successResponse);
          resolve(successResponse.data.products.map((item:any) => this.mapProduct(item)));
        }, (errorResponse: any) => {
           // reset storage and login when needed
          if (errorResponse.message === 'Invalid access token!') {
            this._localStorage.reset();
            location.href = '/auth/login';
            return;
          }
          reject(errorResponse);
        });
    });
  }


  /**
   * Used to format data to IProductItem
   * @param data
   */
  public mapProduct(data:any): IPosProductItem {
    const { product, variants, profiles, compounds } = data;

    let pImages = product.images;
    let rIndex = Math.floor(Math.random() * pImages.length);

    return {
      product_id:               product.product_id,
      name:                     product.name,
      brand:                    product.brand,
      image:                    pImages[rIndex].file.path,
      thumbnails:               null,
      variations:               this._mapVariants(variants),
      selected_variation_index: 0,
      description:              product.description,
      thc:                      product.thc,
      cbd:                      product.cbd,
      cannabinoids:             this._mapCannabinoids(compounds.cannabinoids),
      terpenes:                 this._mapTerpenes(compounds.terpenes),
      flavours:                 this._mapFlavour(profiles.flavors),
      effects:                  this._mapEffects(profiles.effects),
      review:                   null,
      type:                     product.type,
      category:                 { id: null, name: product.category, subcategories: [] }
    };

  }

  /**
   * Map product variants
   * @param variants array of product variants from API that needs mapping
   */
  private _mapVariants(variants: Array<any>): Array<IPosProductItemVariation> {
    return variants ? variants.map((variant:any) => {
      return {
        variant_id : variant.variant_id,
        packages:    variant.packages,
        unit:        variant.unit,
        measurement: variant.measurement,
        weight:      variant.unit,
        amount:      variant.price ? variant.price.toString() : '0'
      }
    }) : [];
  }

  /**
   * Map flavours
   * @param flavors array of flavors for this product that needs mapping
   */
  private _mapFlavour(flavors: Array<any>): Array<IPosProductItemFlavour> {
    return flavors ? flavors.map(item => {
      return {
        icon: item.flavor,
        name: item.flavor,
        score: item.score,
      }
    }) : [];
  }

  /**
   * Map effects
   * @param effects array of effects for this product that needs mapping
   */
  private _mapEffects(effects: Array<any>): Array<IPosProductItemEffect> {
    return effects ? effects.map(item => {
      return {
        name:  item.effect,
        score: item.score
      }
    }) : [];
  }

  /**
   * Map cannabinoids
   * @param cannabinoids array of cannabinoids for this product that needs mapping
   */
  private _mapCannabinoids(cannabinoids: Array<any>): Array<IPosProductItemCannabinoid> {
    return cannabinoids ? cannabinoids.map(item => {
      return {
        name:  item.abr,
        score: item.percentage
      }
    }) : [];
  }

  /**
   * Map terpenes
   * @param terpenes array of terpenes for this product that needs mapping
   */
  private _mapTerpenes(terpenes: Array<any>): Array<IPosProductTerpeneItem> {
    return terpenes ? terpenes.map(item => {
      return {
        name:  item,
        color: this._getRandomTerpenseColor()
      }
    }) : [];
  }


  // to generate terpenes color
  private _getRandomTerpenseColor() : string{
    let colors : string[] = Array("red","blue","green","yellow","orange","blue","violet","black");
    let min : number = 0;
    let max : number = colors.length;
    let random =  min + Math.floor((max - min) * Math.random());

    return colors[random];
  }
}
