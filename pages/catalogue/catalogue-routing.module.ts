import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutPageComponent } from 'src/app/@layout/container/app-layout-page/app-layout-page.component';

import { CatalogueComponent } from './catalogue.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      { path: '', redirectTo: 'catalogue', pathMatch: 'full' },

      { path: 'catalogue', component: CatalogueComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
