import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from "@angular/router";  
import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import {ChangeDetectorRef} from '@angular/core';


@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {  

  token : string = "";
  email:string = ""; 
  password:string = ""; 
  confirm_password:string = "";
  isEmailResetSuccessful : boolean = false;  
  button_text : string = "Change Password";
  is_button_disabled : boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _auth: AuthService,
    private _toastr: ToastrService
  ) {
    this.route.params.subscribe( (params) => {  
      this.token = params.id;  
    }); 
  }  
   
  onSubmit() {
    this.is_button_disabled = true; 
    this.button_text  = "Please wait..";
    let error : string = ""; 
 
    if(this.email === ""){
      error = "Invalid email"; 
    }else if(this.password === "" ){
      error = "Invalid password" 
    }else if(this.confirm_password !== this.password){
      error = "Confirm password doesn't match!" 
    } 
    
    if(error !== ""){
      this._toastr.error(error);
      this.is_button_disabled = false; 
      this.button_text  = "Change Password"; 
      this.ref.detectChanges(); 
    }else{        
        this._auth.changePassword(this.token, this.email,  this.password)
          .subscribe(
            (successResponse: any) => {  
              this._toastr.success("You have successfully changed your password!");
              this.isEmailResetSuccessful = true; 
              this.ref.detectChanges(); 
            },
            (errorResponse: any) => { 
              this.is_button_disabled = false; 
              this.button_text  = "Change Password";
              console.log(errorResponse);  
              this._toastr.error(errorResponse.error.message); 
              this.ref.detectChanges(); 
            }
          )
    }

  } 

  ngOnInit(){ 
  } 
}
