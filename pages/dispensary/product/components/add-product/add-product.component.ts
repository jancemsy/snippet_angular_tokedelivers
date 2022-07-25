import { Component, OnInit, HostBinding } from '@angular/core';
import { pageAnimations } from 'src/app/shared/animations';
import { Product, IProduct } from 'src/app/models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['../shared/shared-product-form-component.scss'],
  animations: [pageAnimations],
})
export class AddProductComponent implements OnInit {
  @HostBinding('@pageAnimations')
  product: IProduct = new Product();

  constructor(private _prodService: ProductService) {}

  ngOnDestroy() {}

  ngOnInit(): void {
    this._prodService.updateCurrentProduct = this.product; //start fresh
  }
}
