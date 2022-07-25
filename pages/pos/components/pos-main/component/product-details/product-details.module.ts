import { NgModule } from '@angular/core';
import { ProductDetailsComponent } from './product-details.component';
import { DescriptionComponent } from './components/description/description.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { CompoundsComponent } from './components/compounds/compounds.component';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/@layout/layout.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ProductSharedModule } from 'src/app/pages/web-store/product/components/shared/product.shared.module';
import { PosMainSharedModule } from '../../shared/pos-main-shared.module';
@NgModule({
  declarations: [
    ProductDetailsComponent,
    DescriptionComponent,
    ProfilesComponent,
    CompoundsComponent,
  ],
  imports: [
    CommonModule,

    // custom
    LayoutModule,
    SharedModule,
    ProductSharedModule,
    PosMainSharedModule
  ],
  exports: [
    ProductDetailsComponent
  ]
})
export class ProductDetailModule { }
