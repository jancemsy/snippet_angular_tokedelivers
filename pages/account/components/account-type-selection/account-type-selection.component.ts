import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { userTypes } from 'src/app/@core/constants';

import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { ICardDialogLinks } from 'src/app/shared/components/card-dialog/models/dialog.models';

@Component({
  templateUrl: './account-type-selection.component.html',
  styleUrls: ['./account-type-selection.component.scss']
})
export class AccountTypeSelectionComponent implements OnInit {
  links: ICardDialogLinks[] = [
    { label: 'Already a user? Sign in here.', link: '/auth' }
  ];

  constructor(
    private _router: Router,
    private _localStorage: LocalStorageService,
  ) { }

  ngOnInit(): void {
  }

  handleDialogClick(btnLabel: string) {
    switch(btnLabel) {
      case 'Dispensary':
        this._localStorage.storeLocal('userType', { type: userTypes.DISPENSARY });
        this._router.navigate(['account/create-dispensary']);
        break;

      case 'Cannabis User':
        this._localStorage.storeLocal('userType', { type: userTypes.CANNABISUSER });
        this._router.navigate(['account/create-cannabis-user']);
        break;
    }
  }

}
