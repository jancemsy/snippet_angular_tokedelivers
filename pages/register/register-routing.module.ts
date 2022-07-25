import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RegisterDispensaryComponent } from './dispensary/dispensary.component';   
import { RegisterUserComponent } from './user/user.component';   
import { LandingComponent } from './landing/landing.component';  
import { RegisterModule } from './register.module'
import { RegisterLayoutComponent } from 'src/app/@layout/container/register-layout/register-layout.component';

const routes: Routes = [ 
  {
    path: '',  
    component: RegisterLayoutComponent, 
    children: [ 	
      { path: '', component: LandingComponent }, 
      { path: 'dispensary', component: RegisterDispensaryComponent }, 
      { path: 'user', component: RegisterUserComponent },  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), RegisterModule], 
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
