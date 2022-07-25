import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from 'src/app/@layout/layout.module';

import { LandingPageLayoutComponent } from '../../@layout/container/landing-page-layout/landing-page-layout.component';
import { CustomerComponent } from './customer.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageLayoutComponent,
    children: [
      { path: '', redirectTo: 'account' },
      { path: 'account', component: AccountSettingsComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
