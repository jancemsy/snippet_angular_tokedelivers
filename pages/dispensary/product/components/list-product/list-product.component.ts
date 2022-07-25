import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';

import { ProductsService } from 'src/app/services/products/products.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'Image',
    'Name',
    'SKU',
    'Price',
    'Size',
    'Use',
    'Category',
    'THC',
    'CBD',
    'Actions',
  ];
  products: any = [];
  paginated: any = {};

  private _unsubscribe$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  company_id: number;

  isLoading: boolean = true;

  search_term: string = '';

  constructor(
    private _topNavState: TopNavStateService,
    private _productService: ProductsService,
    private _localStorageService: LocalStorageService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
    this._topNavState.setTopNavTitle('Products');
  }

  ngOnInit(): void {
    this.company_id = this._localStorageService.retrieveItem(
      'loginInfo'
    ).user_company_id;

    this.getCompanyProducts(1);
  }

  getCompanyProducts(
    page: number // @param: Pagination page nmumber
  ) {
    this._productService
      .getCompanyProducts(this.company_id, page)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: any) => {
        this.products = new MatTableDataSource(
          this.formatBatchProfileJSON(res.data.data)
        );
        this.paginated = res.data;
        this.isLoading = false;
      });
  }

  changePage(event) {
    this.getCompanyProducts(event.pageIndex + 1);
  }

  onAdd() {
    this._router.navigate(['/app/admin/products/new']);
  }

  ngAfterViewInit() {
    // this.products.paginator = this.paginator;
    // this.products.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();

    if (this.products.paginator) {
      this.products.paginator.firstPage();
    }
  }

  onEdit(id) {
    this._router.navigate(['/app/admin/products/edit/', id]);
  }

  onDelete(product) {
    let dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: 'Are you sure you want to delete ' + product.name + ' product?',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._productService
            .deleteCompanyProduct(product.id)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((res: any) => {
              this.products = new MatTableDataSource(
                this.formatBatchProfileJSON(res.data.data)
              );
              this.paginated = res.data;
            });
        }
      });
  }

  onSearch() {
    let body = {
      term: this.search_term,
      company_id: this.company_id,
    };

    this._productService
      .search(body)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((res: any) => {
        this.products = new MatTableDataSource(
          this.formatBatchProfileJSON(res.data.data)
        );
        this.paginated = res.data;
      });
  }

  formatBatchProfileJSON(data) {
    for (let product of data) {
      for (let batch of product.batches) {
        if (batch && batch.profile_json[0]) {
          batch.profile_json[0].json_data = JSON.parse(
            batch.profile_json[0].json_data
          );
        }
      }
    }
    return data;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
