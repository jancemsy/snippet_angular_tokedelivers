import { Component, OnDestroy, OnInit } from '@angular/core';

import { DispensaryService } from 'src/app/services/dispensaries/dispensary.service';
import { InventoryService } from 'src/app/services/inventories/inventory.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { SelectDropdownStateService } from 'src/app/services/state-management/form-controls/select-dropdown-state.service';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';

import { SelectDropDown } from 'src/app/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnDestroy, OnInit {
  activeDispensary: SelectDropDown = {
    label: 'Loading...',
    value: null,
  };

  displayedColumns = [];

  columnNames = [
    { field: 'id', label: 'Package ID' },
    { field: 'sku', label: 'SKU' },
    { field: 'name', label: 'Package Name' },
    { field: 'category', label: 'Category' },
    { field: 'unit_price', label: 'Unit Price' },
    { field: 'total', label: 'Total', css: 'w-10' },
    { field: 'reserved', label: 'Reserve' },
  ];

  vm: any = {
    searchText: null,
    page: 0,
    pageSize: 10,
  };

  inventories: any[];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _inventory: InventoryService,
    private _selectDropDown: SelectDropdownStateService,
    private _toastr: ToastrService,
    private _topNavState: TopNavStateService,
  ) {
    this.initPage();
    this.initListeners();
  }

  fetchInventoryByDispensary() {
    if (this.activeDispensary) {
      const { value } = this.activeDispensary;

      if (value) {
        this._inventory.getInventories(value.id)
          .pipe( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
              const { data } = successResponse;

              this.inventories = data.inventories;
            },
            (errorResponse: any) => {
              console.log(errorResponse);
              this.inventories = null;
            }
          );
      }
    }
  }

  initListeners() {
    this._selectDropDown.selectedItem
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(item => {
        if (item) {
          this.activeDispensary = item;
          this.fetchInventoryByDispensary();
        }
      });
  }

  initPage() {
    this._topNavState.initTopNavSelect();
  }

  ngOnDestroy() {
    this._selectDropDown.setSelectDropDownList(null);
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit() {
    this._topNavState.setTopNavTitle('Inventory');
  }

  onQtyEdits(event, item) {
    item.isEditing = event;
  }

  onQtyChange(event, item) {
    item.qty = event;
  }

  updateInventory(item) {
    if (item.isEditing) {
      const { id } = this.activeDispensary.value;
      const { variant: { variant_id }, qty } = item;

      this._inventory.updateInventories({ dispensary_id: id, variant_id, qty })
        .subscribe(
          (successResponse: any) => {
            console.log(successResponse);
            const { message } =  successResponse;
            this._toastr.info(message || 'Successfully updated inventory.');
          },
          (errorResponse: any) => {
            console.log(errorResponse);
            const { error: { message } } = errorResponse;
            if (typeof message === 'string' ) {
              this._toastr.error(message);
            } else {
              this._toastr.error('Failed to update inventory.');
            }
          }
        );
    }

    item.isEditing = !item.isEditing;
  }

}
