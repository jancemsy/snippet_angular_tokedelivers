import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DispensaryListComponent } from './dispensary-list.component';

const routes: Routes = [{ path: '', component: DispensaryListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensaryListRoutingModule { }
