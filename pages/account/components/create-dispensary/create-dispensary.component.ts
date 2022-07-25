import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { NavigationEnd, Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SignupStepsService } from '../../services/signup-steps.service';
import { IStepperItem } from 'src/app/models';

@Component({
  selector: 'app-create-dispensary',
  templateUrl: './create-dispensary.component.html',
  styleUrls: ['./create-dispensary.component.scss'],
})
export class CreateDispensaryComponent implements OnDestroy, OnInit {
  private _unsubscribe$ = new Subject<any>();

  stepperItems: IStepperItem[];

  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _signUpSteps: SignupStepsService,
  ) {
    this._signUpSteps.stepperState
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe((items) => {
        if (items) {
          const active = items.filter(item => item.isActive);
          if (active && active.length) {
            this.stepperStatus(active[0]);
          } else {
            this.stepperStatus({ value: 2 });
          }
        }
      });
  }

  get companyInfo() {
    return this._localStorage.retrieveItem('companyInfo');
  }

  get contactInfo() {
    return this._localStorage.retrieveItem('contactInfo');
  }

  get signInInfo() {
    return this._localStorage.retrieveItem('signInInfo');
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initStepper();
    this.initListeners();
  }

  initListeners() {
    this._signUpSteps.stepperState
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe((stepperState: IStepperItem[]) => {
        if (stepperState && stepperState.length) {
          this.stepperItems = stepperState;
        }
      });
  }

  initStepper() {
    this.stepperItems = [
      {
        label: 1,
        value: 1,
        isSuccess: !!this.signInInfo,
        isActive: !this.signInInfo,
        isDisabled: true
      },
      {
        label: 2,
        value: 2,
        isActive: this.signInInfo && !this.companyInfo,
        isSuccess: !!this.companyInfo && this.signInInfo.access_token,
        isDisabled: !this.signInInfo || !this.signInInfo.access_token
      },
      {
        label: 3,
        value: 3,
        isActive: !this.companyInfo && this.contactInfo,
        isSuccess: !!this.companyInfo && !!this.contactInfo,
        isDisabled: !this.companyInfo || !this.signInInfo.access_token,
      },
      {
        label: 4,
        value: 4,
        isDisabled: !this.contactInfo || !this.signInInfo.access_token,
      },
    ];

    this._signUpSteps.setStepperState(this.stepperItems);
  }

  stepperStatus(event) {
    switch(event.value) {
      case 1:
        this._router.navigateByUrl('account/create-dispensary/step1');
        break;
      case 2:
        this._router.navigateByUrl('account/create-dispensary/step2');
        break;
      case 3:
        this._router.navigateByUrl('account/create-dispensary/step3');
        break;
      case 4:
        this._router.navigateByUrl('account/create-dispensary/step4');
        break;
    }
  }

  resetItemStatus(index) {
    this.stepperItems.map((stepperItem, i) => {
      stepperItem.isActive = false;
      if (i === index) {
        stepperItem.isActive = true;
      }
    });
  }

}
