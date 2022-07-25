import { Component, OnInit, ViewChild, ChangeDetectionStrategy, OnDestroy , ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

import { userTypes } from 'src/app/@core/constants';
import { AuthService } from '../../../../services/auth/auth.service'; 
//import { bounceAnimation } from 'src/app/shared/animations';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  //animations: [bounceAnimation],
})
export class LoginComponent implements OnDestroy, OnInit {
  private _unsubscribe$ = new Subject<any>();
 
  is_signin_disabled : boolean = false; 
  signin_text : string = 'Sign In';
  fieldTextType: boolean = false;
  //button_state : string = 'default';

  form: FormGroup;

  @ViewChild('emailErrors', { static: false }) emailErrors: NgxErrorsDirective;
  @ViewChild('passwordErrors', { static: false }) passwordErrors: NgxErrorsDirective;

  constructor(
    private ref: ChangeDetectorRef,
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {
    this.form = this._form;    
  }

  get f() { return this.form.controls; };

  get emailInvalid() {
    if (!this.emailErrors) {
      return false;
    }

    return this.emailErrors.hasError('required', 'touched');
  }

  get passwordInvalid() {
    if (!this.passwordErrors) {
      return false;
    }

    return this.passwordErrors.hasError('required', 'touched');
  }

  private get _form(): FormGroup {
    return this._fb.group({
      email: [null, [
        Validators.required,
      ]],
      password: [null, [
        Validators.required,
      ]],
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signin_text = 'Please Wait..'    
    this.is_signin_disabled = true; 

    const { DISPENSARY, CANNABISUSER } = userTypes
    const { value } = this.form;

    this._auth.signIn(value)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (response: any) => {
          this._localStorage.storeLocal('loginInfo', response);
          if (response.is_registration_completed) {  //if completed, redirect the user to specific dashboard
            if (response.user_role_id === DISPENSARY) {
              location.href = 'app/admin';
            } else if (response.customer_id) {
              location.href = '/';
            } else {
              location.href = 'app/user';
            }
          } else {
            //TODO: the app still redirects user back to step1. we need it to proceed to step2 and disable step1
            if (response.user_role_id === DISPENSARY) {
              this._localStorage.storeLocal('userType', { type: DISPENSARY });
              location.href = 'account/create-dispensary/step2';
            } else {
              this._localStorage.storeLocal('userType', { type: CANNABISUSER });
              location.href = 'account/create-cannabis-user/step2';
            }
          }
        },
        (errorResponse) => {
          this.signin_text = 'Sign In';
          this.is_signin_disabled = false; 
          this.ref.detectChanges(); 

          console.log('errorResponse: ', errorResponse);

          const { error } = errorResponse;
          let is_errored : boolean = false; 
 
          //dynamically accepts any form of errors from the api. 
          if (error && error.message ) {   
             if(Array.isArray(error.message.email)){ 
              is_errored = true;
              this._toastr.error(error.message.email[0] || 'Login Error.')
             } 

             if(Array.isArray(error.message.password)){ 
              is_errored = true;
              this._toastr.error(error.message.password[0] || 'Login Error.')
             }  

             if(is_errored === false &&  error.message){ 
              is_errored = true;
              this._toastr.error(error.message || 'Login Error.')
             }  
          } 
          

          if(is_errored === false){
            this._toastr.error('Login Error.')
          } 

        }
      );
  }

  public toggleFieldTextType()
  {
    this.fieldTextType = !this.fieldTextType;
  }
}
