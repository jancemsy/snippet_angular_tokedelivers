import { NgModule } from '@angular/core';
import { ProductPriceComponent } from './product-price/product-price.component';
import { ProductCardComponent } from './product-card/product-card.component'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSharedModule } from 'src/app/pages/web-store/product/components/shared/product.shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FileUploadModule } from 'ng2-file-upload';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { LongPressDirective } from 'src/app/directives/long-press.directive';
import { CustomDirectivesModule } from 'src/app/directives/custom-directives.module';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

@NgModule({
  declarations: [
    ProductPriceComponent,
    ProductCardComponent,
    ProductOptionsComponent,
    LockscreenComponent
  ],
  imports: [
    CustomDirectivesModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductSharedModule,
    MatAutocompleteModule,
    FileUploadModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    ProductPriceComponent,
    ProductCardComponent,
    ProductOptionsComponent,
    LockscreenComponent,
    LongPressDirective
  ]
})

export class PosMainSharedModule {}
