import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DispensaryRoutingModule } from './dispensary-routing.module';
import { DispensaryComponent } from './dispensary.component';
import { DispensaryDashboardComponent } from './dispensary-dashboard/dispensary-dashboard.component';

import { EmployeeComponent } from './employee/employee.component';
import { EmployeeModule } from './employee/employee.module';

import { ProductRoutingModule } from './product/product-routing.module';


import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DiscountPromoComponent } from './discount-promo/discount-promo.component';

@NgModule({
  declarations: [
    DispensaryComponent,
    DispensaryDashboardComponent,
    EmployeeComponent,
    DiscountPromoComponent,
  ],
  imports: [
    EmployeeModule,
    CommonModule,
    DispensaryRoutingModule,
    ProductRoutingModule,



    // third-party
    BsDatepickerModule,

    // custom
  ],
  exports: []
})
export class DispensaryModule { }
