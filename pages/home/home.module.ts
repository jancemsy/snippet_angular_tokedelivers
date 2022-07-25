import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutModule } from 'src/app/@layout/layout.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { BannerSectionComponent } from './components/banner-section/banner-section.component';
import { DispensariesNearMeComponent } from './components/dispensaries-near-me/dispensaries-near-me.component';
import { HomeComponent } from './home.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { StoreProductModule } from 'src/app/pages/web-store/product/store-product.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { LocationInputComponent } from './components/dispensaries-near-me/components/location-input/location-input.component';
import { DispensaryItemComponent } from './components/dispensaries-near-me/components/dispensary-item/dispensary-item.component';


@NgModule({
  declarations: [
    BannerSectionComponent,
    DispensariesNearMeComponent,
    HomeComponent,
    ProductsSectionComponent,
    LocationInputComponent,
    DispensaryItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,

    // third-party

    // custom
    LayoutModule,
    PipesModule,
    SharedModule,
    StoreProductModule,
  ],
})
export class HomeModule {}
