import { NgModule } from '@angular/core';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { ProductDetailInfoComponent } from './product-detail-info/product-detail-info.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { CircleBarComponent } from './circle-bar/circle-bar.component';
import { PercentBarComponent } from './percent-bar/percent-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { ProductPrimaryInfoComponent } from './product-primary-info/product-primary-info.component';
import { CommonModule } from '@angular/common';
//import { OneCartComponent } from '../../../../web-store/cart/components/one-cart/one-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    ProductSidebarComponent,
    ProductThumbnailComponent,
    ProductDetailInfoComponent,
    CircleBarComponent,
    PercentBarComponent,
    SearchBarComponent,
    ProfileStatsComponent,
    ProductPrimaryInfoComponent,
    //OneCartComponent,
  ],
  imports: [ 
    FormsModule,ReactiveFormsModule,
    CommonModule, 
  ],
  exports: [
    ProductSidebarComponent,
    ProductThumbnailComponent,
    ProductDetailInfoComponent,
    CircleBarComponent,
    PercentBarComponent,
    SearchBarComponent,
    ProfileStatsComponent,
    ProductPrimaryInfoComponent,
    //OneCartComponent,
  ],
  providers: [],
})
export class ProductSharedModule {}
