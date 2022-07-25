import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutPageComponent } from 'src/app/@layout/container/app-layout-page/app-layout-page.component';
import { DispensaryDashboardComponent } from '../dispensary/dispensary-dashboard/dispensary-dashboard.component';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      {
        path: '',
        component: UserComponent ,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

          { path: 'dashboard', component: DispensaryDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
