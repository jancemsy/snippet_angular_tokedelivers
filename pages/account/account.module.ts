import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../../shared/components/shared.module';

import { AccountComponent } from './account.component';
import { VerifyAgeComponent } from './components/verify-age/verify-age.component';
import { AccountTypeSelectionComponent } from './components/account-type-selection/account-type-selection.component';
import { AccountCreationThankYouComponent } from './components/account-creation-thank-you/account-creation-thank-you.component';


@NgModule({
  declarations: [
    AccountComponent,
    VerifyAgeComponent,
    AccountTypeSelectionComponent,
    AccountCreationThankYouComponent
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    // custom
    SharedModule,
  ]
})
export class AccountModule { }
