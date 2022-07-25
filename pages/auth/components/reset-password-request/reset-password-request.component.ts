import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; 
import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr'; 
import { AuthService } from 'src/app/services/auth/auth.service';
import {ChangeDetectorRef} from '@angular/core'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './reset-password-request.component.html', 
  styleUrls: ['./reset-password-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordRequestComponent implements OnInit {
  private _unsubscribe$ = new Subject();
  is_button_disabled : boolean = false;
  button_text : string = "Reset Password";

  form: FormGroup; 
  hasEmailProvided: boolean;
  isEmailResetSuccessful  : boolean = false;
  isFormSending : boolean = false; 

  @ViewChild('emailErrors', { static: false }) emailErrors: NgxErrorsDirective;
  @ViewChild('passwordErrors', { static: false }) passwordErrors: NgxErrorsDirective;
  @ViewChild('confirmPasswordErrors', { static: false }) confirmPasswordErrors: NgxErrorsDirective;

  constructor(
    private ref: ChangeDetectorRef,
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
  ) {
     
    this.form = this._form;
  }

  ngOnInit(): void {
  }

  get f() { return this.form.controls; };

  get emailInvalid() {
    if (!this.emailErrors) {
      return false;
    }

    return this.emailErrors.hasError('required', 'touched');
  }
  
  private get _form(): FormGroup {
    return this._fb.group({
      email: [null, [
        Validators.required,
      ]],
    });
  }

  processPasswordRequest() {    
    const { value } = this.f.email; 
    this.button_text = 'Please wait..';
    this.isFormSending = true; 
    this.is_button_disabled = true;

    this._auth.requestResetPassword(value)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (successResponse: any) => { 
          console.log('successResponse: ', successResponse,this.isEmailResetSuccessful);  
          this.hasEmailProvided = true;
          this.isEmailResetSuccessful = true;       
          this.isFormSending = false;   
          this.button_text = 'Reset Password';
          this.is_button_disabled = false;
          this.ref.detectChanges(); 
        },
        (errorResponse: any) => {
          console.log('errorResponse: ', errorResponse);

          
          console.log('errorResponse: ', errorResponse);

          const { error } = errorResponse;
          let is_errored : boolean = false; 
 
          //dynamically accepts any form of errors from the api. 
          if (error && error.message ) {   
             if(Array.isArray(error.message.email)){ 
              is_errored = true;
              this._toastr.error(error.message.email[0] || 'Request Error.')
             } 

             if(Array.isArray(error.message.password)){ 
              is_errored = true;
              this._toastr.error(error.message.password[0] || 'RequestError.')
             }  

             if(is_errored === false &&  error.message){ 
              is_errored = true;
              this._toastr.error(error.message || 'Request Error.')
             }  
          } 
          

          if(is_errored === false){
            this._toastr.error('Request Error.')
          } 



          this.button_text = 'Reset Password';
          this.is_button_disabled = false;
          this.isFormSending = false;
          this.ref.detectChanges();  
        }
      );
  }

  onSubmit() {
    if (this.f.email.value && !this.hasEmailProvided) {
      this.processPasswordRequest(); 
    } 
  }
}
