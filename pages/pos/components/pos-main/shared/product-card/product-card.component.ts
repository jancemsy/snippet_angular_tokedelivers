import { Component, Input, OnInit } from '@angular/core';
import { IPosProductItem, IPosProductItemVariation, PosCartItem } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  public image: string;
  public name: string;
  public weight: string;
  public amount: string;
  public measurement: string;

  private _product: IPosProductItem;
  private _isShowInfo: boolean;

  @Input() set product(product: any) {
    if (product) {
      this.image  = product.image;
      this.name   = product.name;
      this.weight = product.variations[0].weight;
      this.amount = product.variations[0].amount;
      this.measurement = product.variations[0].measurement;
      this._product = product;
      this._isShowInfo = product.variations.length > 1;
    }
  }

  constructor(
    private _posMainService: PosMainService,
    private _posSideService: PosSideService,
  ) { }

  ngOnInit(): void {
    // console.log("waat");
  }

  public onAddItem() {
    // TODO add condition whether to show the product info or add to cart
    if (!this._isShowInfo) {
      let cartItem : PosCartItem;
      let index = this._product.selected_variation_index
      console.log(this._product);
      let variant: IPosProductItemVariation = this._product.variations[index]
      console.log(variant);
      cartItem = {
        id: this._product.product_id,
        variant_id : variant.variant_id,
        name : this._product.name,
        price : Number(variant.amount),
        package : variant.packages[0],
        quantity : 1,
        status : 0,
        img_src : this._product.image,
        measurement : variant.measurement,
        unit : variant.unit
      }

      console.log("add to cart: ", cartItem);
      this._posSideService.addCartItem(cartItem);
    } else {
      this.showInfo();
    }
  }

  public showInfo() {
    // this._isShowInfo = true;
    this._posMainService.setCurrentProduct(this._product);
  }

}
