import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxErrorsModule } from '@hackages/ngxerrors';

import { CreateCanUserRoutingModule } from './create-can-user-routing.module';
import { AccountComponentsModule } from '../shared/account-components.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { CreateCanUserComponent } from './create-can-user.component';
import { CannabisUserCreationComponent } from './cannabis-user-creation/cannabis-user-creation.component';
import { CannUserInfoComponent } from './cann-user-info/cann-user-info.component';


@NgModule({
  declarations: [
    CannabisUserCreationComponent,
    CannUserInfoComponent,
    CreateCanUserComponent,
  ],
  imports: [
    CommonModule,
    CreateCanUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-Party
    FileUploadModule,
    NgxErrorsModule,

    // custom
    AccountComponentsModule,
    SharedModule,
  ]
})
export class CreateCanUserModule { }
