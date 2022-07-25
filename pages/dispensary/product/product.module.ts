import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { EmployeeRoutingModule } from './employee-routing.module';
//import { SharedModule } from '../../shared/shared.module';
import { ProductSharedModule } from './components/shared/product.shared.module';

import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    ListProductComponent,
    AddProductComponent,
    EditProductComponent,
  ],
  imports: [
    FileUploadModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
    ModalModule.forRoot(),

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    // custom
    ProductSharedModule,
  ],
  exports: [ListProductComponent, AddProductComponent, EditProductComponent],
})
export class ProductModule {}
