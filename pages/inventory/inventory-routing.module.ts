import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutPageComponent } from 'src/app/@layout/container/app-layout-page/app-layout-page.component';

import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' },

      { path: 'inventory', component: InventoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
