import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CustomerRoutingModule } from './customer-routing.module';
import { LayoutModule } from 'src/app/@layout/layout.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { CustomerSharedModule } from 'src/app/shared/modules/customer-shared/customer-shared.module';
import { LoginInformationModule } from 'src/app/shared/modules/customer-shared/components/login-information/login-information.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SelectAddressDialogComponent } from './checkout/components/select-address-dialog/select-address-dialog/select-address-dialog.component';
import { RewardsComponent } from './account-settings/components/rewards/rewards.component';
import { RewardsDetailsComponent } from './account-settings/components/rewards/rewards-details/rewards-details.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RedeemRewardsDialogComponent } from './checkout/components/redeem-rewards-dialog/redeem-rewards-dialog.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    CheckoutComponent,
    SelectAddressDialogComponent,
    RewardsComponent,
    RewardsDetailsComponent,
    RedeemRewardsDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,

    ModalModule.forRoot(),

    // Third-Party
    NgxErrorsModule,
    TabsModule.forRoot(),

    // custom
    LayoutModule,
    SharedModule,
    CustomerSharedModule,
    LoginInformationModule,

    // BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    BsModalRef,
    NgbActiveModal
  ],
  exports: [RewardsComponent]
})
export class CustomerModule { }
