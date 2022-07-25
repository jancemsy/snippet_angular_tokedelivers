import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';


import { DiscountPromoRoutingModule } from './discount-promo-routing.module';

import { AddDiscountPromoComponent } from './components/add-discount-promo/add-discount-promo.component';
import { EditDiscountPromoComponent } from './components/edit-discount-promo/edit-discount-promo.component';
import { DollarDiscountComponent } from './components/add-discount-promo/components/dollar-discount/dollar-discount.component';
import { PercentageDiscountComponent } from './components/add-discount-promo/components/percentage-discount/percentage-discount.component';
import { QuantityDealComponent } from './components/add-discount-promo/components/quantity-deal/quantity-deal.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { DiscountPromoSettingsComponent } from './components/discount-promo-settings/discount-promo-settings.component';
import { DiscountLimitsComponent } from './components/discount-promo-settings/components/discount-limits/discount-limits.component';
import { DiscountGroupsComponent } from './components/discount-promo-settings/components/discount-groups/discount-groups.component';
import { DiscountGroupListComponent } from './components/discount-promo-settings/components/discount-groups/components/discount-group-list/discount-group-list.component';
import { DiscountGroupAddComponent } from './components/discount-promo-settings/components/discount-groups/components/discount-group-add/discount-group-add.component';


@NgModule({
  declarations: [
    AddDiscountPromoComponent,
    EditDiscountPromoComponent,
    DollarDiscountComponent,
    PercentageDiscountComponent,
    QuantityDealComponent,
    DiscountPromoSettingsComponent,
    DiscountLimitsComponent,
    DiscountGroupsComponent,
    DiscountGroupListComponent,
    DiscountGroupAddComponent,
  ],
  imports: [
    CommonModule,
    DiscountPromoRoutingModule,

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    // custom
    SharedModule,
  ],
  exports: [],
})
export class DiscountPromoModule { }
