import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss']
})
export class ProductOptionsComponent implements OnInit {

  @Input() settings: Array<any>;
  @Output() onSelected = new EventEmitter();

  public current: any;
  public isOpen: boolean = false;

  constructor() { }

  // sample below
  // public settings: any = [
  //   { text: 'All Products', value: 'all' },
  //   { text: 'Category', value: 'category' },
  //   { text: 'Strain', value: 'strain' },
  //   { text: 'Brand', value: 'brand' }
  // ]

  ngOnInit(): void {
    if (!this.settings && this.settings.length > 0) {
      console.log("[PRODUCT_OPTIONS] must provide an option to render this component");
      return;
    }

    this.current = this.settings[0];
  }

  toggleOption() {
    this.isOpen = !this.isOpen;
  }

  chooseOption(option: any, index: number) {
    // console.log("selected option is : ", index);
    this.isOpen = false;
    this.current = option;

    this.onSelected.emit(option);

    return;
  }

}
