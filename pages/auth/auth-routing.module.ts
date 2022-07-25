import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { FullPageComponent } from 'src/app/@layout/container/full-page/full-page.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { AppUserGuard, LoggedInUserGuard } from 'src/app/@core/guards';

const routes: Routes = [
  {
    path: '',
    component: FullPageComponent,
    children: [
      {
        path: '',
        component: AuthComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },

          {
            path: 'login',
            canActivate: [ LoggedInUserGuard ],
            component: LoginComponent
          },
          { path: 'reset-password/:id', component: ResetPasswordComponent },
          { path: 'reset-password-request', component: ResetPasswordRequestComponent },

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
