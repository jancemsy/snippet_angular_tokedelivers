import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { DispensaryService } from 'src/app/services/dispensaries/dispensary.service';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { Dispensary } from 'src/app/models';

import { AddDispensaryComponent } from './add-dispensary/add-dispensary.component';
import { CustomDataTableComponent } from 'src/app/shared/components/data-table/data-table.component';
import { DispensaryDetailsComponent } from './dispensary-details/dispensary-details.component';
import { EditDispensaryComponent } from './edit-dispensary/edit-dispensary.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-dispensary-list',
  templateUrl: './dispensary-list.component.html',
  styleUrls: ['./dispensary-list.component.scss'],
})
export class DispensaryListComponent implements OnDestroy, OnInit {
  form: FormGroup;
  dispensaries: Dispensary[] = [];
  filteredDispensary: Dispensary[] = [];
  vm: any = {
    searchText: null,
  };

  dtActions = [
    {
      label: 'Edit Dispensary Details',
      class: 'custom-class-here',
      iconClass: '', // TODO: implememt later
      click: (menuItem: any, item: any) => {
        this.dataTable.actionEvent.emit({ menuItem, item });
      },
    },
    {
      label: 'Edit Employees',
      class: 'custom-class-here', // TODO: implement when ready
      iconClass: '', // TODO: implememt later
      click: (menuItem: any, item: any) => {
        this.dataTable.actionEvent.emit({ menuItem, item });
      },
    },
    {
      label: 'Edit Inventory',
      class: 'custom-class-here', // TODO: implement when ready
      iconClass: '', // TODO: implememt later
      click: (menuItem: any, item: any) => {
        this.dataTable.actionEvent.emit({ menuItem, item });
      },
    },
    {
      label: 'Edit Web Store',
      class: 'custom-class-here', // TODO: implement when ready
      iconClass: '', // TODO: implememt later
      click: (menuItem: any, item: any) => {
        this.dataTable.actionEvent.emit({ menuItem, item });
      },
    },
  ];

  dtHeaders = [
    { field: 'dispensary_name', label: 'Name' },
    { field: 'dispensary_address_line_1', label: 'Street' },
    { field: 'dispensary_city', label: 'City' },
    { field: 'email', label: 'Email' },
    { field: 'phone_number'},
    { field: 'employees'},
    { field: 'actionMenu', label: ''},
  ];

  @ViewChild(CustomDataTableComponent) dataTable: CustomDataTableComponent;

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _dispensaryService: DispensaryService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    private _topNavState: TopNavStateService,
  ) {
    this.form = this._fb.group({
      searchText: [null]
    });
    this._topNavState.setTopNavTitle('Dispensaries');
    this.fetchDispensaries();
  }

  get f() { return this.form.controls; };

  fetchDispensaries() {
    this._dispensaryService.getDispensaries()
      .subscribe(
        (successResponse: any) => {
          if (successResponse.data && successResponse.data.dispensaries) {
            this.dispensaries = successResponse.data.dispensaries;
            this.injectDetailsComponent();
          }
        },
        (errorResponse: any) => {
          const { error } = errorResponse;
          if (error) {
            this._toastr.error(error.message || 'Failed to fetch dispensaries.');
          } else {
            this._toastr.error('Failed to fetch dispensaries.');
          }
        }
      );
  }

  injectDetailsComponent() {
    this.dispensaries.map((item: any) => {
      item.componentClass = DispensaryDetailsComponent;
      item.modalSize = 'xl';
      item.actionMenu = this.dtActions;
    });

    this.filteredDispensary = this.dispensaries;
  }

  editDispensaryDetails(dispensary) {
    const modalRef = this._modalService.open(EditDispensaryComponent, { size: 'xl' });
    modalRef.componentInstance.dispensaryInfo = dispensary;
  }

  ngOnDestroy(){
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
  }

  tableActions(event) {
    console.log('tableActions: ', event);
    switch(event.menuItem) {
      case 0:
        this.editDispensaryDetails(event.item);
        break;
      case 1:
        this.editDispensaryDetails(event.item);
        break;
    }
  }

  onAddDispensary() {
    const modalRef = this._modalService.open(AddDispensaryComponent, { size: 'lg' });
  }
}
