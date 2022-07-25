import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDispensaryComponent } from './create-dispensary.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { AccountInformationsComponent } from './account-informations/account-informations.component';
import { LicenseInformationComponent } from './license-information/license-information.component';
import { DispensaryInformationComponent } from './dispensary-information/dispensary-information.component';

const routes: Routes = [
  {
    path: '',
    component: CreateDispensaryComponent,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },

      { path: 'step1', component: AccountCreationComponent },
      { path: 'step2', component: AccountInformationsComponent },
      { path: 'step3', component: LicenseInformationComponent },
      { path: 'step4', component: DispensaryInformationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateDispensaryRoutingModule { }
