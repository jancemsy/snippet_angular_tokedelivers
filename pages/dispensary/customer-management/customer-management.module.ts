import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { CustomerManagementComponent } from './customer-management.component';
import { CustomerManagementSettingsComponent } from './components/customer-management-settings/customer-management-settings.component';


@NgModule({
  declarations: [CustomerManagementComponent, CustomerManagementSettingsComponent],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule
  ]
})
export class CustomerManagementModule { }
