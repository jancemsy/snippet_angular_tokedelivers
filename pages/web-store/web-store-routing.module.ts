import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutPageComponent } from '../../@layout/container/app-layout-page/app-layout-page.component';
import { WebStoreComponent } from './web-store.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      {
        path: 'web-store/design',
        component: WebStoreComponent,
        loadChildren: () => import('./web-store.module').then(m => m.WebStoreModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebStoreRoutingModule { }
