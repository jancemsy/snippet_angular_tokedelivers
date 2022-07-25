import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './verify-age.component.html',
  styleUrls: ['./verify-age.component.scss']
})
export class VerifyAgeComponent implements OnInit {

  isUnderAged: boolean;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  handleDialogClick(btnLabel: string) {
    switch(btnLabel) {
      case 'Yes':
        this._router.navigateByUrl('account/select-account-type');
        break;
      case 'No':
        this.isUnderAged = true;
        break;
    }
  }
}
