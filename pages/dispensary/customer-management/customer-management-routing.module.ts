import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerManagementComponent } from './customer-management.component';

const routes: Routes = [{ path: '', component: CustomerManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
