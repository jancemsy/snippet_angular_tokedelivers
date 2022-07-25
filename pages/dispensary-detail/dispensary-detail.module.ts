import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensaryDetailRouteModule } from './dispensary-detail-routing.module';
import { LayoutModule } from 'src/app/@layout/layout.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { DispensaryDetailComponent } from './dispensary-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SpecialDealsComponent } from './components/special-deals/special-deals.component';
import { RecommendedStrainsComponent } from './components/recommended-strains/recommended-strains.component';
import { StoreProductModule } from 'src/app/pages/web-store/product/store-product.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    DispensaryDetailComponent,
    SpecialDealsComponent,
    RecommendedStrainsComponent,
  ],
  imports: [
    CommonModule,
    DispensaryDetailRouteModule,
    CarouselModule,
    // custom
    LayoutModule,
    SharedModule,
    StoreProductModule,
    PipesModule
  ]
})
export class DispensaryDetailModule { }
