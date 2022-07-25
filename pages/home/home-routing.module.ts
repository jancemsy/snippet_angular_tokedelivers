import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutModule } from 'src/app/@layout/layout.module';

import { LandingPageLayoutComponent } from '../../@layout/container/landing-page-layout/landing-page-layout.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageLayoutComponent,
    children: [
      { path: '/', redirectTo: '', pathMatch: 'full' },

      { path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
