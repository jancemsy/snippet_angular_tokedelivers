import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerUserGuard, SuperAdminGuard } from 'src/app/@core/guards';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },

  {
    path: 'admin',
    canActivate: [ SuperAdminGuard ],
    children: [
      {path:'', loadChildren: () => import('./dispensary/dispensary.module').then(m => m.DispensaryModule)},
      {path:'', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},
      {path:'', loadChildren: () => import('./web-store/web-store.module').then(m => m.WebStoreModule)},
      { path: '', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
      { path: '', loadChildren: () => import('./catalogue/catalogue.module').then(m => m.CatalogueModule) },
    ],
  },

  {
    path: 'user',
    canActivate: [ CustomerUserGuard ],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
