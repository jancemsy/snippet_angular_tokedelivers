import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

@Component({
  templateUrl: './account-creation-thank-you.component.html',
  styleUrls: ['./account-creation-thank-you.component.scss']
})
export class AccountCreationThankYouComponent implements OnInit {

  constructor(
    private _router: Router,
    private _localStorage: LocalStorageService,
  ) {
    this._localStorage.reset();
  }

  ngOnInit(): void {
  }

  handleDialogClick(event : any) {
    event.stopPropagation();
    this._router.navigateByUrl('auth');

  }
}
