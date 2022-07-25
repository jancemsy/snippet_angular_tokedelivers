import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { SignupStepsService } from '../../../services/signup-steps.service';
import { userTypes } from 'src/app/@core/constants';
import { IStepperItem } from 'src/app/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './cannabis-user-creation.component.html',
  styleUrls: ['./cannabis-user-creation.component.scss']
})
export class CannabisUserCreationComponent implements OnDestroy, OnInit {
  private _stepperItems: IStepperItem[] = [];
  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _signUpSteps: SignupStepsService,
    private _toastr: ToastrService,
  ) {
    this._signUpSteps.stepperState
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
    const { CANNABISUSER } = userTypes
    const creds = { ...value, type: CANNABISUSER };

    this._auth.signup(creds)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (result: any) => { // TODO: create proper model type
          this._toastr.success(result.message);
          result.email = value.email;
          this._signUpSteps.setSigninInfo(result.data, CANNABISUSER);
          this._goNext(1);
          this._router.navigateByUrl('/account/create-cannabis-user/step2');
        },
        (errorResult) => {
          const { error } = errorResult;
          console.log('cannabis-user-signup-error: ', error);

          if (error.message && Array.isArray(error.message.email)) {
            error.message.email.map(item => {
              this._toastr.error(item);
            });
          } else {
            this._toastr.error(error.message);
          }
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
