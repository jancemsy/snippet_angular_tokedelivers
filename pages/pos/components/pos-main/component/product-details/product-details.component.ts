import { Component, Input, OnInit } from '@angular/core';
import { IPosProductItem, IPosProductItemVariation, PosCartItem } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product:IPosProductItem;

  public isActive:boolean = false;
  public pIndex:number = 0;

  public productInfoTabs:any = [
    { id: 'tab-description', label: 'Description', isActive: true },
    { id: 'tab-profiles', label: 'Profiles', isActive: false },
    { id: 'tab-compounds', label: 'Compounds', isActive: false },
  ];

  public productQuantity:any = [];

  constructor(
    private _posMainService: PosMainService,
    private _posSideService: PosSideService,
  ) {
  }

  ngOnInit(): void {
    // console.log("[POS][PRODUCT_DETAIL] info ", this.product);

    this.pIndex = this.product.selected_variation_index;

    this.product.variations.forEach((variation, index) => {
      this.productQuantity.push({
        text: variation.measurement + ' ' + variation.weight,
        value: index
      });
    });

    this.onShow()
  }

  public onShow() {
    setTimeout(() => {
      this.isActive = true;
    }, 200);
  }

  public onHide() {
    this._posMainService.setCurrentProduct(null);
  }

  public onVariantChange(event:any) {
    console.log("[P_DETAILS][VARIANT_CHANGED] value : ", event)
    return this.pIndex = event.value;
  }

  public currentAmount() {
    return this.product.variations[this.pIndex].amount;
  }

  public onAddCart() {
    let cartItem : PosCartItem;
      // let index = this.product.selected_variation_index
      let variant: IPosProductItemVariation = this.product.variations[this.pIndex]
      cartItem = {
        id:          this.product.product_id,
        name:        this.product.name,
        img_src:     this.product.image,
        price:       Number(variant.amount),
        variant_id:  variant.variant_id,
        package:     variant.packages[0],
        measurement: variant.measurement,
        unit:        variant.unit,
        quantity:    1,
        status:      0,

      }

      console.log("[P_DETAILS][ADD_TO_CART]: ", cartItem);
      this._posSideService.addCartItem(cartItem);
      this._posMainService.setCurrentProduct(null);
  }

}
