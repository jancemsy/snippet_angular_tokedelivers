import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RegisterService } from '../register.service';
import { ValidationsApiService } from 'src/app/services/helpers/validations-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class RegisterUserComponent implements OnInit, OnDestroy {

  regForm: FormGroup;
  private _unsubscribe$ = new Subject<any>();
  fieldTextType: boolean = false;

  constructor(
    private fb: FormBuilder,
    private validationAPIService: ValidationsApiService,
    private registerService: RegisterService,
    private router: Router
  ) {

    this.regForm = this.fb.group({
      email: [null, Validators.compose([
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        Validators.required
      ])],
      password: [null, Validators.compose([
        Validators.required, 
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')
      ])],
      password_confirmation: [null, Validators.required]
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

  ngOnDestroy()
  {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
