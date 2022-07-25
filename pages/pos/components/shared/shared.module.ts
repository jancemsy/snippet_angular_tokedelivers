import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogClearCartComponent } from './components/dialog-clear-cart/dialog-clear-cart.component'
import { DialogEnterPromoComponent } from './components/dialog-enter-promo/dialog-enter-promo.component';
import { FormsModule } from '@angular/forms';
import { PosAlertInfoComponent } from './components/pos-alert-info/pos-alert-info.component';
import { DialogCartDetailsComponent } from './components/dialog-cart-details/dialog-cart-details.component';
import { DialogLoyaltyPointsComponent } from './components/dialog-loyalty-points/dialog-loyalty-points.component';
import { DialogCustomerNewComponent } from './components/dialog-customer-new/dialog-customer-new.component';
import { SharedModule } from 'src/app/shared/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    // SharedModule
  ],
  declarations: [
    DialogCartDetailsComponent,
    DialogClearCartComponent,
    DialogCustomerNewComponent,
    DialogEnterPromoComponent,
    DialogLoyaltyPointsComponent,
    PosAlertInfoComponent,
  ],
  exports: [
    PosAlertInfoComponent,
  ]
})
export class PosSharedModule { }
