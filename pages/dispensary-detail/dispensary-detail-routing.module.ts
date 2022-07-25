import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from 'src/app/@layout/layout.module';

import { LandingPageLayoutComponent } from '../../@layout/container/landing-page-layout/landing-page-layout.component';
import { DispensaryDetailComponent } from './dispensary-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageLayoutComponent,
    children: [
      { path: ':id', component: DispensaryDetailComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class DispensaryDetailRouteModule { }
