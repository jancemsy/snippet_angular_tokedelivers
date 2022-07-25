import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../@layout/layout.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LandingComponent } from './register/landing/landing.component'; 


@NgModule({
  declarations: [PagesComponent, LandingComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,

    // third-party
    BsDatepickerModule,

    // custom modules
    LayoutModule,
  ]
})
export class PagesModule { }
