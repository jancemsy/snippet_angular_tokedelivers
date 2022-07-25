import { Component, OnInit, ChangeDetectionStrategy, ViewChild, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'ngx-custom-validators';
import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { passwordPattern, emailPattern } from 'src/app/@core/constants';
import { ISignUpInfo, IAuthState } from 'src/app/models';

import { ValidationsApiService } from 'src/app/services/helpers/validations-api.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountFormComponent implements OnDestroy, OnInit {
  form: FormGroup;
  vm: any = {};
  isFormSubmitted: boolean;
  showErrors: boolean;

  private _unsubscribe$ = new Subject<any>();

  @Output() proceed = new EventEmitter<ISignUpInfo>();
  @Output() formValid = new EventEmitter<boolean>();

  @ViewChild('emailErrors', { static: false }) emailErrors: NgxErrorsDirective;
  @ViewChild('passwordErrors', { static: false }) passwordErrors: NgxErrorsDirective;
  @ViewChild('confirmPasswordErrors', { static: false }) confirmPasswordErrors: NgxErrorsDirective;

  get f() { return this.form.controls; }

  get emailInvalid() {
    if (!this.emailErrors) {
      return false;
    }

    return (
      this.emailErrors.hasError('required', 'touched')
      || this.emailErrors.hasError('pattern', 'dirty')
      || this.emailErrors.hasError('exists', 'dirty')
    );
  }

  get passwordInvalid() {
    if (!this.passwordErrors) {
      return false;
    }

    return (
      this.passwordErrors.hasError('required', 'touched')
      || this.passwordErrors.hasError('pattern', 'dirty')
    );
  }

  get confirmPasswordInvalid() {
    if (!this.confirmPasswordErrors) {
      return false;
    }

    return (
      this.confirmPasswordErrors.hasError('required', 'touched')
      || this.confirmPasswordErrors.hasError('equalTo', 'dirty')
    );
  }

  constructor(
    private _fb: FormBuilder,
    private _validate: ValidationsApiService,
    private _toastr: ToastrService,
  ) {
    this.initForm();
  }

  initForm() {
    const password = new FormControl('', [
      Validators.required,
      Validators.pattern(passwordPattern)
    ]);

    const confirmPassword = new FormControl('', [
      Validators.required,
      CustomValidators.equalTo(password)
    ]);

    this.form = this._fb.group({
      email: [null, [
          Validators.required,
          Validators.pattern(emailPattern),
        ]
      ],
      password,
      confirmPassword,
      termsAgreed: [null, Validators.required],
      privacyAgreed: [null, Validators.required],
    });
  }

  initListeners() {
    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.isFormSubmitted = false;
        if (this.form.valid) {
          this.showErrors = false
          this.formValid.emit(true);
        }
      });

    this.f.email.valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value) => {
        if (this.f.email.valid) {
          this.onEmailChanged();
        } else {
          this.showErrors = true;
        }
      });

    this.f.confirmPassword.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this._unsubscribe$)
      )
      .subscribe(() => {
        this.showErrors = true;
      });
  }

  onEmailChanged() {
    console.log("check email on changed. heree");
    this._validate.checkEmailExists(this.f.email.value)
      .pipe( takeUntil(this._unsubscribe$))
      .subscribe(
        (result: any) => { // TODO: create proper model type
          console.log('email-validation-success: ', result);
          this.vm.email = {
            success: true,
            message: [ result.message ],
          };

          this._toastr.info(result.message);
        },
        (errorResponse) => {
          const { error }= errorResponse;
          console.log('email-validation-error: ', errorResponse);
          this.f.email.setErrors({ exists: true });

          if (error) {
            if (error.message && Array.isArray(error.message.email)) {
              error.message.email.map(item => {
                this._toastr.error(item);
              });
            } else {
              this._toastr.error(error.message);
            }
            this.vm.email = null;
            console.log('this.f.email: ', this.f.email);
          } else {
            this._toastr.error('Failed to validate email.')
          }
        },
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges-changes: ', changes);

    if (!!changes.status) {
      const status: IAuthState | null = changes.status.currentValue;

      console.log('ngOnChanges-status: ', status);
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initListeners();
  }

  onProceed() {
    this.isFormSubmitted = true;
    const { value } = this.form;

    this.proceed.emit(value);
  }
}
