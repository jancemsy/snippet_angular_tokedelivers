import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxErrorsModule } from '@hackages/ngxerrors';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { DispensaryListRoutingModule } from './dispensary-list-routing.module';
import { EmployeeModule } from '../employee/employee.module'
import { SharedModule } from 'src/app/shared/components/shared.module';

import { DispensaryListComponent } from './dispensary-list.component';
import { DispensaryDetailsComponent } from './dispensary-details/dispensary-details.component';
import { AddDispensaryComponent } from './add-dispensary/add-dispensary.component';
import { DispensaryInfoFormComponent } from './shared/components/dispensary-info-form/dispensary-info-form.component';
import { DispensaryEmployeesComponent } from './shared/components/dispensary-employees/dispensary-employees.component';
import { OperationTimesComponent } from './shared/components/operation-times/operation-times.component';
import { CompletionPageComponent } from './shared/components/completion-page/completion-page.component';
import { EditDispensaryComponent } from './edit-dispensary/edit-dispensary.component';
import { DispensaryInfoSectionComponent } from './edit-dispensary/components/dispensary-info-section/dispensary-info-section.component';
import { DispensaryLicenseSectionComponent } from './edit-dispensary/components/dispensary-license-section/dispensary-license-section.component';
import { OperatingTimeSectionComponent } from './edit-dispensary/components/operating-time-section/operating-time-section.component';
import { EmployeeListSectionComponent } from './edit-dispensary/components/employee-list-section/employee-list-section.component';


@NgModule({
  declarations: [
    DispensaryListComponent,
    DispensaryDetailsComponent,
    AddDispensaryComponent,
    DispensaryInfoFormComponent,
    DispensaryEmployeesComponent,
    OperationTimesComponent,
    CompletionPageComponent,
    EditDispensaryComponent,
    DispensaryInfoSectionComponent,
    DispensaryLicenseSectionComponent,
    OperatingTimeSectionComponent,
    EmployeeListSectionComponent,
  ],
  imports: [
    CommonModule,
    DispensaryListRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Third-Party
    BsDatepickerModule,
    FileUploadModule,
    NgxErrorsModule,
    TimepickerModule.forRoot(),

    // custom
    EmployeeModule,
    SharedModule,
  ],
  entryComponents: [
    AddDispensaryComponent,
    DispensaryDetailsComponent,
    EditDispensaryComponent,
  ]
})
export class DispensaryListModule { }
