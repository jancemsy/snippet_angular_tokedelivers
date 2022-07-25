import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { IStepperItem } from 'src/app/models';

import { SignupStepsService } from '../../../services/signup-steps.service';
import { ValidationsApiService } from 'src/app/services/helpers/validations-api.service';

@Component({
  templateUrl: './account-informations.component.html',
  styleUrls: ['./account-informations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountInformationsComponent implements OnInit {
  private _stepperItems: IStepperItem[] = [];
  private _unsubscribe$ = new Subject<any>();

  form: FormGroup;

  @ViewChild('legalNameErrors', { static: false }) legalNameErrors: NgxErrorsDirective;
  @ViewChild('address1Errors', { static: false }) address1Errors: NgxErrorsDirective;
  @ViewChild('cityErrors', { static: false }) cityErrors: NgxErrorsDirective;
  @ViewChild('stateErrors', { static: false }) stateErrors: NgxErrorsDirective;
  @ViewChild('zipErrors', { static: false }) zipErrors: NgxErrorsDirective;

  get f() { return this.form.controls; }

  get legalNameInvalid() {
    if (!this.legalNameErrors) {
      return false;
    }

    return (
      this.legalNameErrors.hasError('required', 'touched')
      || this.legalNameErrors.hasError('invalid', 'dirty')
    );
  }

  get address1Invalid() {
    if (!this.address1Errors) {
      return false;
    }

    return (
      this.address1Errors.hasError('required', 'touched')
    );
  }

  get cityInvalid() {
    if (!this.cityErrors) {
      return false;
    }

    return (
      this.cityErrors.hasError('required', 'touched')
    );
  }

  get stateInvalid() {
    if (!this.stateErrors) {
      return false;
    }

    return (
      this.stateErrors.hasError('required', 'touched')
    );
  }

  get zipInvalid() {
    if (!this.zipErrors) {
      return false;
    }

    return (
      this.zipErrors.hasError('required', 'touched')
    );
  }

  get companyInfo() {
    return this._localStorage.retrieveItem('companyInfo');
  }

  constructor(
    private _fb: FormBuilder,
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _signUpSteps: SignupStepsService,
    private _toastr: ToastrService,
    private _validate: ValidationsApiService,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      legal_company_name: [null, Validators.required],
      address_line_1: [null, Validators.required],
      address_line_2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
    });

    const companyInfo = this.companyInfo;
    if (companyInfo) {
      this.form.setValue({ ...companyInfo });
    }
  }

  ngOnInit(): void {
    this.initListeners()
  }

  initListeners() {
    this._signUpSteps.stepperState
      .subscribe((items) => {
        if (items) {
          this._stepperItems = items;
        }
      });

    this.f.legal_company_name.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value) => {
        this.onLegaNameChanged(value);
      });
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

  onLegaNameChanged(dispensary_name: string) {
    this._validate.checkLegalNameExists(dispensary_name)
      .subscribe(
        (result: any) => {
          this._toastr.info(result.message);
        },
        (errorResult) => {
          const { error } = errorResult;
          const message = error.message || 'Dispensary name is not valid';
          this._toastr.error(message);
          this.f.legal_company_name.setErrors({ invalid: true });
        }
      )
  }

  proceed() {
    const { value } = this.form;
    this._localStorage.storeLocal('companyInfo', value);

    this._goNext(2);
    this._router.navigateByUrl('/account/create-dispensary/step3');
  }
}
