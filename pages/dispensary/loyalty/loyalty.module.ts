import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { LoyaltyRoutingModule } from './loyalty-routing.module';

import { AddLoyaltyComponent } from './components/add-loyalty/add-loyalty.component';
import { EditLoyaltyComponent } from './components/edit-loyalty/edit-loyalty.component';
import { PointsTiersRuleComponent } from './components/add-loyalty/components/points-tiers-rule/points-tiers-rule.component';
import { LoyaltyRewardComponent } from './components/add-loyalty/components/loyalty-reward/loyalty-reward.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { LoyaltySharedModule } from './components/loyalty-settings/components/shared/loyalty.shared.module';

import { LoyaltyComponent } from './loyalty.component';
import { LoyaltyListComponent } from './components/loyalty-list/loyalty-list.component';
import { LoyaltyMembersComponent } from './components/loyalty-members/loyalty-members.component';
import { LoyaltySettingsComponent } from './components/loyalty-settings/loyalty-settings.component';
import { LoyaltyTiersComponent } from './components/loyalty-settings/components/loyalty-tiers/loyalty-tiers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoyaltyTiersDetailComponent } from './components/loyalty-settings/components/loyalty-tiers-detail/loyalty-tiers-detail.component';

@NgModule({
  declarations: [
    //LoyaltyComponent,
    AddLoyaltyComponent,
    EditLoyaltyComponent,
    PointsTiersRuleComponent,
    LoyaltyComponent,
    LoyaltyRewardComponent,
    LoyaltyListComponent,
    LoyaltyMembersComponent,
    LoyaltySettingsComponent,
    LoyaltyTiersComponent,
    LoyaltyTiersDetailComponent,
  ],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-Party
    CustomFormsModule,
    NgxErrorsModule,
    TabsModule.forRoot(),

    // custom
    SharedModule,
    LoyaltySharedModule,
  ],
  exports: [LoyaltyMembersComponent, LoyaltySettingsComponent, LoyaltyTiersComponent],
})
export class LoyaltyModule { }
