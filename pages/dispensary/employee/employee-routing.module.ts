import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { CreateDispensaryGuard  } from '../../../@core/guards';

import { EmployeeComponent } from './employee.component';
//import { VerifyAgeComponent } from './components/verify-age/verify-age.component';
//import { FullPageComponent } from 'src/app/@layout/container/full-page/full-page.component'; 

import { FullPageComponent } from 'src/app/@layout/container/full-page/full-page.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

/*
const routes: Routes = [
  {
    path: '',
     //FullPageComponent,
    children: [
      {
        path: '',
        component: EmployeeComponent,
        children: [
          //{ path: '', redirectTo: 'list', pathMatch: 'full' }, 
          //{ path: 'employee', component: EmployeeListComponent },        
          { path: 'list', component: EmployeeListComponent },        
          { path: 'edit', component: EditEmployeeComponent },
          
        ],
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmployeeRoutingModule { }
*/
export class EmployeeRoutingModule { }


