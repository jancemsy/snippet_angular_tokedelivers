import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';

import { NgxErrorsModule } from '@hackages/ngxerrors';
import { CustomFormsModule } from 'ngx-custom-validators';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../../../shared/components/shared.module';

import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from 'ng2-file-upload';



/*
https://valor-software.com/ngx-bootstrap/#/pagination
*/


@NgModule({
  declarations: [
    //EmployeeComponent,
    EditEmployeeComponent,
    EmployeeListComponent
  ],
  imports: [
    FileUploadModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    //PaginationModule.forRoot(),
    //EmployeeRoutingModule,
    CommonModule,
    ModalModule.forRoot(),

    // Third-Party
    NgxErrorsModule,
    CustomFormsModule,

    // custom
    SharedModule
  ],
  exports: [
    //EmployeeComponent,
    EditEmployeeComponent,
    EmployeeListComponent
  ]
})
export class EmployeeModule { }
