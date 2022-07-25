import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@hackages/ngxerrors';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ResetPasswordRequestComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-Party
    NgxErrorsModule,
  ],
  exports: []
})
export class AuthModule { }
