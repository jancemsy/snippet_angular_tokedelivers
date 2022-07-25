import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.scss']
})
export class ProductPriceComponent implements OnInit {

  public currency: string = '$'
  public amount: string = '0'
  public decimal: string = '00'

  @Input() set price(_price: string) {
    if (_price && parseFloat(_price) > 0) {
      let _arr = _price.split('.');
      this.amount = _arr[0];
      this.decimal = _arr.length > 1 ? _arr[1] : '00';

      // add extra 0 format
      if (this.decimal.length == 1) {
        this.decimal += '0';
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
