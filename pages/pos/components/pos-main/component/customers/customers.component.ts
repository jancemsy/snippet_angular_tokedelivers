import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, mergeMap, takeUntil } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer/customer.model';
import { PosService } from 'src/app/services/pos/pos.service';
import { DialogCustomerNewComponent } from '../../../shared/components/dialog-customer-new/dialog-customer-new.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(
    private _posService: PosService,
    private _dialog: MatDialog,
  ) { }

  private _customers$ = new BehaviorSubject<Customer[]>(null);
  public customers$: Observable<Customer[]> = this._customers$.asObservable();

  public keyUp = new Subject<KeyboardEvent>();
  public posMode : string;

  private _subscription: Subscription;
  private _unsubscribe$ = new Subject<any>();


  ngOnInit() {
     // this is for search
     this._subscription = this.keyUp.pipe(
      map(event => (event.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(300),
      )),
    ).subscribe(keyword => {
      console.log("the keyword is : ", keyword)
    });


    this.fetchCustomers();

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._subscription.unsubscribe();
  }

  onNewCustomer() {
    this._dialog.open(DialogCustomerNewComponent, {
      panelClass: 'pos-dialog-container'
    });
  }

  fetchCustomers(term: string = "", page: number = 1) {
    let params = {
      term: term,
      page: page,
      limit: 10,
    };
    this._posService.customers(params)
          .pipe( takeUntil(this._unsubscribe$) )
          .subscribe(
            (successResponse: any) => {
              if (successResponse.success) {
                this._customers$.next(successResponse.data.customers);
              }
              console.log("the customers are ", successResponse);
            }
          );
  }

  customerType() {
    let types = ['Dispensary', 'Toke'];
    let index = Math.round(Math.random());
    return types[index];
  }

  customerColor() {
    let colors = ['', 'green', 'orange', 'purple'];
    let index = Math.floor(Math.random() * Math.floor(4));
    return colors[index];
  }

}
