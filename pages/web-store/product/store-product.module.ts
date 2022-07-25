import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductSharedModule } from './components/shared/product.shared.module';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';  
import { StoreProductRoutingModule } from './store-product-routing.module';



@NgModule({
  declarations: [ListProductComponent, DetailProductComponent],
  imports: [  
    CommonModule, 
    ProductSharedModule,
    StoreProductRoutingModule,
  ],
  exports: [ListProductComponent, DetailProductComponent],
})
export class StoreProductModule {}
