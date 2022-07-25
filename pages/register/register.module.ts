import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { RegisterPillComponent } from './shared/register-pill/register-pill.component';
import { RegisterDispensaryComponent } from './dispensary/dispensary.component';
import { RegisterUserComponent } from './user/user.component';
import { PaymenBoxComponent } from './shared/payment-box/payment-box.component';


@NgModule({
  declarations: [ RegisterPillComponent, RegisterDispensaryComponent, PaymenBoxComponent, RegisterUserComponent ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    SharedModule,
  ],
  exports: [  RegisterPillComponent, RegisterDispensaryComponent,PaymenBoxComponent,RegisterUserComponent  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class RegisterModule {}
