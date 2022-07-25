import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebStoreRoutingModule } from './web-store-routing.module';
import { WebStoreComponent } from './web-store.component';


@NgModule({
  declarations: [WebStoreComponent],
  imports: [
    CommonModule,
    WebStoreRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WebStoreModule { }
