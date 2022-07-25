import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxErrorsModule } from '@hackages/ngxerrors';

import { CreateDispensaryRoutingModule } from './create-dispensary-routing.module';
import { AccountComponentsModule } from '../shared/account-components.module';
import { SharedModule } from 'src/app/shared/components/shared.module';

import { CreateDispensaryComponent } from './create-dispensary.component';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccountInformationsComponent } from './account-informations/account-informations.component';
import { LicenseInformationComponent } from './license-information/license-information.component';
import { DispensaryInformationComponent } from './dispensary-information/dispensary-information.component';


@NgModule({
  declarations: [CreateDispensaryComponent, AccountCreationComponent, AccountInformationsComponent, LicenseInformationComponent, DispensaryInformationComponent],
  imports: [
    CommonModule,
    CreateDispensaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // third-party
    FileUploadModule,
    NgxErrorsModule,
    PopoverModule.forRoot(),

    // custom
    AccountComponentsModule,
    SharedModule,
  ]
})
export class CreateDispensaryModule { }
