import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscountPromoComponent } from './discount-promo.component';

const routes: Routes = [{ path: '', component: DiscountPromoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountPromoRoutingModule { }
