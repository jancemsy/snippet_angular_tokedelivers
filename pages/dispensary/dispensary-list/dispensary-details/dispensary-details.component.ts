import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { toProper } from 'src/app/@core/functions';
import { DispensaryService } from 'src/app/services/dispensaries/dispensary.service';
import { EditDispensaryComponent } from '../edit-dispensary/edit-dispensary.component';

@Component({
  selector: 'app-dispensary-details',
  templateUrl: './dispensary-details.component.html',
  styleUrls: ['./dispensary-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispensaryDetailsComponent implements OnDestroy, OnInit {
  private _employeesHeader = [
    { field: 'full_name', label: 'Name' },
    { field: 'roleName', label: 'Role' },
    { field: 'email' },
    { field: 'phone' },
  ];

  private _workHoursHeader = [
    { field: 'dayLabel', label: 'Day' },
    { field: 'start' },
    { field: 'end' },
  ];

  private _unsubscribe$ = new Subject<any>();

  @Input() dispensaryInfo: any = {}; // TODO: create a proper type model

  constructor(
    private _dispensaryService: DispensaryService,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
  ) { }

  get workHoursHeader() {
    return this._workHoursHeader;
  }

  get employeesHeader() {
    return this._employeesHeader;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    if (this.dispensaryInfo) {
      this.initializeFormData();

      this.dispensaryInfo.details.working_hours
        .map((item: any) => {
          item.dayLabel = toProper(item.day);
          item.start = item.is_closed ? 'Closed' : item.start;
          item.end = item.is_closed ? '' : item.end;
          return item;
        });

      this.dispensaryInfo.details.employees
        .map((item: any) => {
          item.roleName = item.role ? item.role.name : '';
          return item;
        });
    }
  }

  activateDispensary() {
    const { dispensary_id } = this.dispensaryInfo;
    this._dispensaryService.activeDispensary(dispensary_id)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          this._toastr.info('Successfully updated dispensary status.');
        },
        (errorResponse: any) => {
          console.log(errorResponse);
          this._toastr.error('Failed to update Dispensary status.');
        }
      );
  }

  deactiveDispensary() {
    const { dispensary_id } = this.dispensaryInfo;
    this._dispensaryService.deactiveDispensary(dispensary_id)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse);
          this._toastr.info('Successfully updated dispensary status.');
        },
        (errorResponse: any) => {
          console.log(errorResponse);
          this._toastr.error('Failed to update Dispensary status.');
        }
      );
  }

  editDispensary() {
    const modalRef = this._modalService.open(EditDispensaryComponent, { size: 'xl' });
    modalRef.componentInstance.dispensaryInfo = this.dispensaryInfo;
  }

  get statusLabel() {
    const { status } = this.dispensaryInfo;
    return !status ? 'Activate Dispensary' : 'Deactivate Dispensary';
  }

  initializeFormData() {
    const { details } = this.dispensaryInfo;

    if (details.employees && details.employees.length) {
      details.employees.map(employee => {
        employee.roleName = employee.role.name;
      });

      this.dispensaryInfo.details.employee = details.employee;
    }
  }

  onStatusDispensary() {
    const { status } = this.dispensaryInfo;
    this.dispensaryInfo.status = !status ? 1 : 0;

    if (status === 1) {
      this.deactiveDispensary();
    } else {
      this.activateDispensary();
    }
  }

  toProper(item: String) {
    return item;
  }
}
