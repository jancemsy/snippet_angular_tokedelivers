import { Component, OnInit, OnDestroy } from '@angular/core';
import { IStepperItem } from 'src/app/models';
import { SignupStepsService } from '../../services/signup-steps.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-can-user',
  templateUrl: './create-can-user.component.html',
  styleUrls: ['./create-can-user.component.scss']
})
export class CreateCanUserComponent implements OnDestroy, OnInit {
  private _unsubscribe$ = new Subject<any>();

  stepperItems: IStepperItem[];

  constructor(
    private _router: Router,
    private _localStorage: LocalStorageService,
    private _signUpSteps: SignupStepsService,
  ) {
    this._signUpSteps.stepperState
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe((items) => {
        if (items) {
          const active = items.filter(item => item.isActive);
          if (active && active.length) {
            this.stepperStatus(active[0]);
          }
        }
      });
  }

  get contactInfo() {
    return this._localStorage.retrieveItem('contactInfo');
  }

  get signInInfo() {
    return this._localStorage.retrieveItem('signInInfo');
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
        isActive: !this.signInInfo
      },
      {
        label: 2,
        value: 2,
        isSuccess: !!this.contactInfo && this.signInInfo && this.signInInfo.confirmPassword,
        isDisabled: !this.signInInfo || (this.signInInfo && !this.signInInfo.confirmPassword),
        isActive: !!this.signInInfo
      }
    ];

    this._signUpSteps.setStepperState(this.stepperItems);
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initListeners();
    this.initStepper();
  }

  stepperStatus(event) {
    console.log('canuser-stepperStatus: ', event);

    switch(event.value) {
      case 1:
        this._router.navigateByUrl('account/create-cannabis-user/step1');
        break;
      case 2:
        this._router.navigateByUrl('account/create-cannabis-user/step2');
        break;
    }
  }

  resetItemStatus(index) {
    console.log('create-can-stepper-resetItemStatus', index);

    this.stepperItems.map((stepperItem, i) => {
      stepperItem.isActive = false;
      if (i === index) {
        stepperItem.isActive = true;
      }
    });
  }

}
