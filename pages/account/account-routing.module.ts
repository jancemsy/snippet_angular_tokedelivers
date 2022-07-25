import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDispensaryGuard, CreateCannabisUserGuard } from '../../@core/guards';

import { AccountComponent } from './account.component';
import { VerifyAgeComponent } from './components/verify-age/verify-age.component';
import { FullPageComponent } from 'src/app/@layout/container/full-page/full-page.component';
import { AccountTypeSelectionComponent } from './components/account-type-selection/account-type-selection.component';
import { AccountCreationThankYouComponent } from './components/account-creation-thank-you/account-creation-thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: FullPageComponent,
    children: [
      {
        path: '',
        component: AccountComponent,
        children: [
          { path: '', redirectTo: 'verify-age', pathMatch: 'full' },

          { path: 'verify-age', component: VerifyAgeComponent },
          { path: 'select-account-type', component: AccountTypeSelectionComponent },

          {
            path: 'create-dispensary',
            canActivate: [ CreateDispensaryGuard ],
            loadChildren: () => import('./components/create-dispensary/create-dispensary.module').then(m => m.CreateDispensaryModule),
          },
          {
            path: 'create-cannabis-user',
            canActivate: [ CreateCannabisUserGuard ],
            loadChildren: () => import('./components/create-can-user/create-can-user.module').then(m => m.CreateCanUserModule)
          },
          {
            path: 'thank-you',
            component: AccountCreationThankYouComponent
          }
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
