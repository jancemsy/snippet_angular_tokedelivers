import { Component, OnDestroy, OnInit } from '@angular/core';

import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { CatalogueService } from 'src/app/services/catalogues/catalogue.service';
import { SelectDropdownStateService } from 'src/app/services/state-management/form-controls/select-dropdown-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectDropDown } from 'src/app/models';
import { toTypeScript } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnDestroy, OnInit {
  activeDispensary: SelectDropDown = {
    label: 'Loading...',
    value: null
  };

  displayedColumns = [];
  vm: any = {
    threshold: {
      value: 10,
      isEditing: false,
    },
    listAll: false,
    searchText: null,
    page: 0,
    pageSize: 10,
  };

  columnNames = [
    { field: 'name', label: 'Product Name' },
    { field: 'category', label: 'Category' },
    { field: 'medicalUse', label: '', css: 'w-5' },
    { field: 'sku', label: 'SKU' },
    { field: 'unit_price', label: 'Unit Price' },
    { field: 'name', label: 'Unit Size' },
    { field: 'threshhold', label: 'Qty Threshold' },
    { field: 'listed', label: 'List Online' },
  ];

  catalogues: any[];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _catalogueService: CatalogueService,
    private _selectDropDown: SelectDropdownStateService,
    private _toastr: ToastrService,
    private _topNavState: TopNavStateService,
  ) {
    this._topNavState.setTopNavTitle('Edit Web Store Catalogue');
    this.initListeners();
    this.initPage();
  }

  initListeners() {
    this._selectDropDown.selectedItem
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(item => {
        if (item) {
          this.activeDispensary = item;
          this.fetchCatalogues();
        }
      });
  }

  initPage() {
    this._topNavState.initTopNavSelect();
  }

  ngOnDestroy() {
    this._selectDropDown.setSelectDropDownList(null);
    this._unsubscribe$.next();
    this._unsubscribe$.complete()
  }

  ngOnInit(): void {
  }

  onQtyEdits(event, item) {
    item.isEditing = event;
  }

  onQtyChange(event, item) {
    item.total = event;
  }

  fetchCatalogues() {
    const { value } = this.activeDispensary;
    const dispensary_id = value.id;

    this._catalogueService.getCataloguesByDispensaryId(dispensary_id)
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse);
          const { catalogues } = successResponse.data;
          if (catalogues && catalogues.length) {
            this.catalogues = catalogues;
          } else {
            this.catalogues = this.demoData();
          }
        },
        (errorResponse: any) => {
          console.log(errorResponse);
        }
      );
  }

  listAllItems () {
    this.catalogues.map(item => {
      item.packages.map(pack => {
        pack.listed = this.vm.listAll;
        pack.isEditing = true;
        return pack;
      });

      return item;
    });
  }

  onGlobalThresholdChanged(event, item) {
    item.threshold.value = event;
    item.threshold.isEditing = true;
  }

  onThresholdChanged(event, item) {
    item.threshold = event;
  }

  setThresholdGlobally() {
    this.vm.threshold.isEditing = false;

    this.catalogues.map(item => {
      item.packages.map(item => {
        item.threshold = this.vm.threshold.value;
        item.isEditing = true;
        return item;
      });
      return item;
    });
  }

  updatePackage(item: any) {
    return new Promise(
      async (resolve, reject) => {
        const { id } = this.activeDispensary.value;
        const { variant_id, threshold } = item;
        const data = {
          dispensary_id: id,
          variant_id,
          threshold,
        };

        this._catalogueService.setThreshold(data)
          .subscribe(
            (successResponse: any) => {
              const { message } = successResponse;
              this._toastr.info(message || 'Successfully updated settings.');
              resolve(true);
            },
            (errorResponse: any) => {
              console.log(errorResponse);
              this._toastr.success('Failed to update settings.');
              reject(false);
            }
          )
      }
    );
  }

  updateSettings(catalogue) {
    if (Array.isArray(catalogue.packages)) {
      catalogue.packages.map(async (item) => {
        if (item.isEditing) {
          const result = await this.updatePackage(item);
          item.isEditing = !result;
        }

        return item;
      });
    }
  }

  demoData() {
    return [
      {
        "product_id": 1,
        "name": "repudiandae",
        "medical_only": 0,
        "producer": "Abbott LLC",
        "supplier_name": "Ondricka Ltd",
        "description": "Occaecati similique tenetur dolorum et voluptatibus eius et omnis nulla odit aut qui et.",
        "category": {
            "id": 1,
            "name": "Flower",
            "subcategories": []
        },
        "packages": [
            {
                "variant_id": 1,
                "package_number": "7135865298064",
                "sku": "9792147816835",
                "measurement": "1.8",
                "unit": "oz.",
                "price": 23,
                "qty": 10
            },
            {
                "variant_id": 2,
                "package_number": "8124810226176",
                "sku": "9786752479332",
                "measurement": "1.8",
                "unit": "oz.",
                "price": 14.75,
                "qty": "0"
            },
            {
                "variant_id": 3,
                "package_number": "1160261304466",
                "sku": "9785678842053",
                "measurement": "1.8",
                "unit": "oz.",
                "price": 6.75,
                "qty": "0"
            }
        ]
      },
      {
        "product_id": 2,
        "name": "veritatis",
        "medical_only": 1,
        "producer": "Jaskolski, Krajcik and Cummings",
        "supplier_name": "Krajcik LLC",
        "description": "Qui perferendis fugit laboriosam eos numquam voluptas aliquam.",
        "category": {
            "id": 1,
            "name": "Flower",
            "subcategories": []
        },
        "packages": [
          {
            "variant_id": 4,
            "package_number": "5090887038383",
            "sku": "9796831404650",
            "measurement": "1.8",
            "unit": "oz.",
            "price": 9.25,
            "qty": 10
          },
          {
              "variant_id": 5,
              "package_number": "4691657697710",
              "sku": "9795479496911",
              "measurement": "1.8",
              "unit": "oz.",
              "price": 17.75,
              "qty": "0"
          },
          {
              "variant_id": 6,
              "package_number": "1650292985333",
              "sku": "9795278653539",
              "measurement": "1.8",
              "unit": "oz.",
              "price": 24.75,
              "qty": "0"
          }
        ]
      }
    ];
  }
}
