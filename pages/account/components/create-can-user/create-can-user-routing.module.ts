import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCanUserComponent } from './create-can-user.component';
import { CannabisUserCreationComponent } from './cannabis-user-creation/cannabis-user-creation.component';
import { CannUserInfoComponent } from './cann-user-info/cann-user-info.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCanUserComponent,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },

      { path: 'step1', component: CannabisUserCreationComponent },
      { path: 'step2', component: CannUserInfoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCanUserRoutingModule { }
