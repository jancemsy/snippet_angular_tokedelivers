import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosPageLayoutComponent } from '../../@layout/container/pos-page-layout/pos-page-layout.component';
import { PosComponent } from './pos.component';

const routes: Routes = [
  {
    path: '',
    component: PosPageLayoutComponent,
    children: [
      { path: '', component: PosComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PosRouteModule { }
