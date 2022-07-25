import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CartItemComponent } from './components/shared/cart-item/cart-item';
import { RewardPopupComponent } from './components/shared/reward/reward';


import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  declarations: [ CartDetailComponent, CartItemComponent , RewardPopupComponent ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    SharedModule,
  ],
  exports: [ CartDetailComponent, CartItemComponent ,RewardPopupComponent  ],
})
export class StoreCartModule {}
