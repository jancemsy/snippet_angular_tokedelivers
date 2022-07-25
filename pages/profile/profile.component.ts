import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopNavStateService } from 'src/app/services/state-management/navigations/top-nav-state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserDispensary } from './models/user-dispensary.model';
import { Account } from './models/user-accounts.model';

import { ProfileService } from './profile.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// Shared Components
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Dispensary } from 'src/app/models';

// Account Form
type AccountControls = { [ key in keyof Account ]: AbstractControl };
type AccountFormGroup = FormGroup & { value: Account, control: AccountControls };

// Identification Form
export interface Identification {
  number: string;
  state: string;
  file: any;
}
type IdentificationControls = { [ key in keyof Identification ]: AbstractControl };
type IdentificationFormGroup = FormGroup & { value: Identification, control: IdentificationControls };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {

  private _unsubscribe$ = new Subject();

  // Result Data
  public _responseDATA: any = {};

  // Accounts Form
  public accountForm = new FormGroup({
    id: new FormControl('', Validators.required),
    user_id: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone_number: new FormControl(),
    address_line_1: new FormControl('', Validators.required),
    address_line_2: new FormControl(),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required)
  }) as AccountFormGroup;

  // Identification
  identifications: any[] = [];
  identificationForm: FormGroup = new FormGroup({
    number: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    file: new FormControl(null, Validators.required)
  }) as IdentificationFormGroup;
  
  // Dispensary Role list
  displayedColumns: string[] = ['Dispensary', 'Role'];
  dataSource: Dispensary[] = [];

  constructor(
    private _topNavState: TopNavStateService,
    private profileService: ProfileService,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {
    this._topNavState.setTopNavTitle('Accounts');
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts()
  {
    this.profileService.getAccounts()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(
          (res: any) => {

            this._responseDATA = res.data;

            // Account Form
            this.accountForm.controls.id.setValue(res.data.profiles[0].id);
            this.accountForm.controls.user_id.setValue(res.data.id);
            this.accountForm.controls.first_name.setValue(res.data.first_name);
            this.accountForm.controls.last_name.setValue(res.data.last_name);
            this.accountForm.controls.email.setValue(res.data.email);
            this.accountForm.controls.phone_number.setValue(res.data.profiles[0].phone_number);
            this.accountForm.controls.address_line_1.setValue(res.data.profiles[0].address_line_1);
            this.accountForm.controls.address_line_2.setValue(res.data.profiles[0].address_line_2);
            this.accountForm.controls.city.setValue(res.data.profiles[0].city);
            this.accountForm.controls.state.setValue(res.data.profiles[0].state);
            this.accountForm.controls.zip.setValue(res.data.profiles[0].zip);

            // Identifications
            this.identifications = res.data.identifications;

            // User Dispensary Roles
            this.dataSource = res.data.dispensaries;

          }
        );
  }

  onSubmitAccountForm()
  {

  }

  onFileSelected(event)
  {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.identificationForm.controls.file.setValue(file);
    }
  }

  onSubmitIdForm()
  {
    const identificationFormData: FormData = new FormData;
    identificationFormData.append('file', this.identificationForm.controls.file.value);
    identificationFormData.append('number', this.identificationForm.controls.number.value);
    identificationFormData.append('state', this.identificationForm.controls.state.value);
    identificationFormData.append('user_id', this._responseDATA.id);

    this.profileService.uploadIdentificationFile(identificationFormData)
                      .pipe(takeUntil(this._unsubscribe$))
                      .subscribe(
                        (res: any) => {
                          this.identifications = res.data;
                          this.identificationForm.reset();
                          this._toastr.info(res.message);
                        },
                        error => {
                          this._toastr.error(error.message);
                        }
                      );
  }

  deleteID(identification)
  {

    let dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to delete " + identification.file.name + " identification?"
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      (confirmed: boolean) => {
        if(confirmed)
        {
          let body = {
            id: identification.id
          }
      
          this.profileService.deleteIdentification(body)
                             .pipe( takeUntil(this._unsubscribe$) )
                             .subscribe(
                               (res: any) => {
                                 this.identifications = res.data;
                                 this._toastr.info(res.message);
                               }
                             );
        }
      }
    );
  }
  onClickSave(){
    
    this.profileService.updateAccounts(this.accountForm.value).pipe(takeUntil(this._unsubscribe$)).subscribe(
      (res: any) => {
        if(res)
        {
          this._toastr.info(res.message);
        }
      }
    );
  }

  clickCancel()
  {

  }

  ngOnDestroy()
  {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
