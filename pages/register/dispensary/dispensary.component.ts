import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterService } from '../register.service';
import { ValidationsApiService } from 'src/app/services/helpers/validations-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dispensary',
  templateUrl: './dispensary.component.html',
  styleUrls: ['./dispensary.component.scss']
})
export class RegisterDispensaryComponent implements OnInit, OnDestroy {

  step : number = 1; 

  regForm: FormGroup;
  is_step_1_invalid: boolean = true;
  is_step_2_invalid: boolean = true;
  is_step_3_invalid: boolean = true;

  private _unsubscribe$ = new Subject<any>();
  fieldTextType: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validationAPIService: ValidationsApiService,
    private registerService: RegisterService,
    private router: Router
  ) { 

    this.regForm = this.fb.group({
      // Company Details
      legal_company_name: [null, Validators.required],
      address_line_1: [null, Validators.required],
      address_line_2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      phone_number: [null, Validators.required],
      company_email: [null, Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.required
      ])],

      // User Details
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required, 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ])],
      password_confirmation: [null, Validators.required],

      // Card Payment Details
      holder_name: [null, Validators.required],
      number: [null, Validators.required],
      expiration_date: [null, Validators.required],
      security_code: [null, Validators.required],
      zip_code: [null],

    }, {validator: [this.validateConfirmPassword('password', 'password_confirmation')]});

  }  

  ngOnInit(): void {
  }

  validateEmail()
  {
    const email = this.regForm.controls['email'];

     // Validate if Email is in correct format
    this.validationAPIService.checkEmailExists(email.value)
                              .pipe(takeUntil(this._unsubscribe$))
                              .subscribe(
                                (res: any) => {
                                  email.setErrors(null);
                                },
                                error => {
                                  if(error.error.message.email[0] === 'The email has already been taken.'){
                                    email.setErrors({emailExists: true});;
                                  };
                                }
                              );
  }

  validateConfirmPassword(password: string, confirm_password: string)
  {
    return (group: FormGroup) => {

      let passwordInput = group.controls[password],
          passwordConfirmInput = group.controls[confirm_password];

      if(passwordInput.value !== passwordConfirmInput.value)
      {
        
        return passwordConfirmInput.setErrors({notMatch: true});

      }else{
        
        return passwordConfirmInput.setErrors(null);
      
      }
    }
  }

  submitForm()
  {
    this.registerService.registerNewCustomer(this.regForm.value)
                    .pipe(takeUntil(this._unsubscribe$))
                    .subscribe(
                      (res: any) => {
                        localStorage.setItem('loginInfo', JSON.stringify(res.data));
                        this.router.navigate(['/store']);
                      }
                    );
  }

  toggleFieldTextType()
  {
    this.fieldTextType = !this.fieldTextType;
  }

  public new_step(s){
    console.log("new step", s);
    this.step = s.step;  
  }

  public clickContinue(){
    console.log("clicked ++"); 
    if(this.step < 3) this.step ++;  //todo add more logic here 
  }

  validate_fields()
  {
    if(this.step === 1)
    {
      if( 
        this.regForm.controls['legal_company_name'].valid &&
        this.regForm.controls['address_line_1'].valid &&
        this.regForm.controls['city'].valid &&
        this.regForm.controls['state'].valid && 
        this.regForm.controls['zip'].valid &&
        this.regForm.controls['phone_number'].valid &&
        this.regForm.controls['company_email'].valid
      )
      {
        this.is_step_1_invalid = false;
      }
    }else if(this.step === 2)
    {
      if(
        this.regForm.controls['first_name'].valid &&
        this.regForm.controls['last_name'].valid &&
        this.regForm.controls['email'].valid &&
        this.regForm.controls['password'].valid &&
        this.regForm.controls['password_confirmation'].valid
      ){
        this.is_step_2_invalid = false;
      }
    }else if(this.step === 3)
    {
      if(
        this.regForm.controls['holder_name'].valid &&
        this.regForm.controls['number'].valid &&
        this.regForm.controls['expiration_date'].valid &&
        this.regForm.controls['security_code'].valid &&
        this.regForm.controls['zip_code'].valid
      ){
        this.is_step_3_invalid = false;
      };
    }

  }

  public clickComplete(){
    if(this.regForm.valid)
    {
      this.registerService.registerNewDispensary(this.regForm.value)
                          .pipe(takeUntil(this._unsubscribe$))
                          .subscribe(
                            (res: any) => {
                              localStorage.setItem('loginInfo', JSON.stringify(res.data));
                              this.router.navigate(['/store']);
                            }
                          )
    }
  }

  ngOnDestroy()
  {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
