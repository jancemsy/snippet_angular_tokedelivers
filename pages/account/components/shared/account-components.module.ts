import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@hackages/ngxerrors';

import { CreateAccountFormComponent } from './components/create-account-form/create-account-form.component';

@NgModule({
  declarations: [CreateAccountFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // third-Party
    NgxErrorsModule,

  ],
  exports: [
    CreateAccountFormComponent
  ]
})
export class AccountComponentsModule { }
