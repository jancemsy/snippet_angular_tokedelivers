import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AppLayoutPageComponent } from '../../@layout/container/app-layout-page/app-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutPageComponent,
    children: [
      {
        path: 'accounts',
        component: ProfileComponent,
        loadChildren: () => import('./profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
