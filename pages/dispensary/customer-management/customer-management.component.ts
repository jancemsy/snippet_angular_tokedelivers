import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

import { customers } from 'src/app/@dummies';
import { Customer } from 'src/app/models/customer/customer.model';
import { LoyaltyMemberDetailsComponent } from 'src/app/shared/components/loyalty/loyalty-member-details/loyalty-member-details.component';
import { CustomerManagementSettingsComponent } from './components/customer-management-settings/customer-management-settings.component';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss']
})
export class CustomerManagementComponent implements OnInit {
  isLoading: boolean;
  customers$ = new BehaviorSubject<Customer[]>([]);

  constructor(
    private _modalService: NgbModal,
  ) {
    this.customers$.next(customers);
  }

  ngOnInit(): void {
  }

  onSettings() {
    const options = {
      centered : true ,
      size: 'sm' ,
      windowClass : 'customer-management-settings'
    };

    const modalRef = this._modalService.open(CustomerManagementSettingsComponent, options);
  }

  onSelectCustomer(item) {
    const options = {
      centered : true,
      size: 'lg',
      windowClass : 'member-loyalty-details'
    };

    const modalRef = this._modalService.open(LoyaltyMemberDetailsComponent, options);

    modalRef.componentInstance.member = item;
  }
}
