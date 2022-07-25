import { Component, Input, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/shared/animations';  

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss'],
  animations: [fadeAnimation],
})
export class ProductThumbnailComponent implements OnInit {
  @Input() item: any = null;

  //for display
  currency: string = '$';
  amount: string = '0';
  decimal: string = '00';
  weight: string = '1kg'; 
  message :string = '';
  


  constructor() {}
  ngOnInit(): void { 
        if(this.item !== null){
          this.weight = this.item.variations[0].weight;
          this.amount_decimal(this.item.variations[0].amount);
          this.message = this.truncate(this.item.review.message,100);
        }    
  }

  private truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
  };

  private amount_decimal(val) {
    val = parseFloat(val).toFixed(2);

    let _arr = `${val}`.split('.');
    this.amount = _arr[0];
    this.decimal = _arr[1];
  }
}
