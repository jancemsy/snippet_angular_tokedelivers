import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer/customer.model';
import { CustomerService } from 'src/app/services/customers/customer.service'
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { IdentificationsService } from 'src/app/services/identifications/identifications.service'
import { BehaviorSubject, Subject } from 'rxjs';
import { points } from 'src/app/@dummies';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public customer: Customer;
  customer$ = new BehaviorSubject<Customer>(null);
  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _customerService: CustomerService,
    private _localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {

    let loginInfo = this._localStorage.retrieveItem('loginInfo');

    if (loginInfo) {
      this._customerService.getCustomer(loginInfo.customer_id)
        .subscribe(
          (successResponse: any) => {
            console.log('[CUSTOMER_ACCOUNT_SETTINGS] success', successResponse);
            this.customer = successResponse.data.customer;
            this.customer.rewards = points;
            this.customer$.next(this.customer);
          },
          (errorResponse: any) => {
            console.log('[CUSTOMER_ACCOUNT_SETTINGS] fail', errorResponse);
          }
        )
    }

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
