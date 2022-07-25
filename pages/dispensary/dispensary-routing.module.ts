import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispensaryComponent } from './dispensary.component';
import { DispensaryDashboardComponent } from './dispensary-dashboard/dispensary-dashboard.component';
import { AppLayoutPageComponent } from 'src/app/@layout/container/app-layout-page/app-layout-page.component';

import { EmployeeComponent } from './employee/employee.component';
import { DiscountPromoComponent } from './discount-promo/discount-promo.component';
//import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      {
        path: '',
        component: DispensaryComponent,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

          //{ path: 'products', component: ProductComponent },
          { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
          { path: 'employees', component: EmployeeComponent },
          { path: 'discount-promo', loadChildren: () => import('./discount-promo/discount-promo.module').then(m => m.DiscountPromoModule) },
          { path: 'loyalty', loadChildren: () => import('./loyalty/loyalty.module').then(m => m.LoyaltyModule) },
          { path: 'dashboard', component: DispensaryDashboardComponent },
          { path: 'dispensaries', loadChildren: () => import('./dispensary-list/dispensary-list.module').then(m => m.DispensaryListModule) },
          { path: 'customers', loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule) },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensaryRoutingModule { }
