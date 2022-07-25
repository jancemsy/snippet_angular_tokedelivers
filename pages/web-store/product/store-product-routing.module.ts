import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { LandingPageLayoutComponent } from 'src/app/@layout/container/landing-page-layout/landing-page-layout.component';

const routes: Routes = [
  {
    path: '',

    component: LandingPageLayoutComponent,

    children: [
      { path: '', component: ListProductComponent },
      { path: 'detail', component: DetailProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreProductRoutingModule {}
