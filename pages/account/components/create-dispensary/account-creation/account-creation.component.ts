import { Component, OnInit, ViewChild, ChangeDetectionStrategy, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { SignupStepsService } from '../../../services/signup-steps.service';
import { IStepperItem } from 'src/app/models';
import { userTypes } from 'src/app/@core/constants/forms/userType'
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './account-creation.component.html',
  styleUrls: ['./account-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCreationComponent implements OnDestroy, OnInit {
  private _unsubscribe$ = new Subject<any>();
  private _stepperItems: IStepperItem[] = [];

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _signUpSteps: SignupStepsService,
    private _toastr: ToastrService,
  ) {
    console.log('account-creation.component');
    this._signUpSteps.stepperState
      .pipe( takeUntil( this._unsubscribe$) )
      .subscribe((items) => {
        if (items) {
          this._stepperItems = items;
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
  }

  proceed(value) {
    const { DISPENSARY } = userTypes;
    const creds = { ...value, type: DISPENSARY };

    this._auth.signup(creds)
      .pipe( takeUntil( this._unsubscribe$) )
      .subscribe(
        (result: any) => { // TODO: create proper model type
          this._toastr.success(result.message);
          result.email = value.email;
          this._signUpSteps.setSigninInfo(result.data, DISPENSARY);
          this._goNext(1);
          this._router.navigateByUrl('/account/create-dispensary/step2');
        },
        (errorResult) => {
          const { error } = errorResult;
          console.log('signup-error: ', error);

          this._toastr.error(error.message || 'There was an error during sign up.');
        }
      );
  }

  private _goNext(next: number) {
    this._stepperItems.map((stepperItem, i) => {
      stepperItem.isSuccess = stepperItem.isActive ? true : stepperItem.isSuccess;
      stepperItem.isActive = false;

      if (i === next) {
        stepperItem.isActive = true;
      }
    });
  }
}
