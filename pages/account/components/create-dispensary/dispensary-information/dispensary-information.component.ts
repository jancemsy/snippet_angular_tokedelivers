import { Component, OnInit, ViewChild, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { ICompanyInformation } from 'src/app/models';

import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { allowedMimeTypes, licenseStatus } from 'src/app/@core/constants'
import { FileUploader } from 'ng2-file-upload';
import { FormDataService } from '../services/form-data.service';
import { getBase64Format } from 'src/app/@core/functions/file-upload-utils.function';

@Component({
  templateUrl: './dispensary-information.component.html',
  styleUrls: ['./dispensary-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispensaryInformationComponent implements OnInit {
  allowedMimeTypes = allowedMimeTypes;
  companyInfo: ICompanyInformation;
  form: FormGroup;
  fileName: string;

  @ViewChild('dispensaryNameErrors', { static: false }) dispensaryNameErrors: NgxErrorsDirective;
  @ViewChild('address1Errors', { static: false }) address1Errors: NgxErrorsDirective;
  @ViewChild('cityErrors', { static: false }) cityErrors: NgxErrorsDirective;
  @ViewChild('stateErrors', { static: false }) stateErrors: NgxErrorsDirective;
  @ViewChild('zipErrors', { static: false }) zipErrors: NgxErrorsDirective;
  @ViewChild('licenseNoErrors', { static: false }) licenseNoErrors: NgxErrorsDirective;
  @ViewChild('licenseStateErrors', { static: false }) licenseStateErrors: NgxErrorsDirective;
  @ViewChild('licenseDateErrors', { static: false }) licenseDateErrors: NgxErrorsDirective;
  @ViewChild('licenseExpireErrors', { static: false }) licenseExpireErrors: NgxErrorsDirective;

  private _file: File | null = null;
  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this._file = file;
  }
  public uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024
  });

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _formStates:  FormDataService,
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _toastr: ToastrService,
  ) {
    this.initForm();
  }

  get f() { return this.form.controls; }

  get dispensaryNameInvalid() {
    if (!this.dispensaryNameErrors) {
      return false;
    }

    return (
      this.dispensaryNameErrors.hasError('required', 'touched')
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

  get licenseNoInvalid() {
    if (!this.licenseNoErrors) {
      return false;
    }

    return (
      this.licenseNoErrors.hasError('required', 'touched')
    );
  }

  get licenseStateInvalid() {
    if (!this.licenseStateErrors) {
      return false;
    }

    return (
      this.licenseStateErrors.hasError('required', 'touched')
    );
  }

  get licenseDateInvalid() {
    if (!this.licenseDateErrors) {
      return false;
    }

    return (
      this.licenseDateErrors.hasError('required', 'touched')
    );
  }

  get licenseExpireInvalid() {
    if (!this.licenseExpireErrors) {
      return false;
    }

    return (
      this.licenseExpireErrors.hasError('required', 'touched')
    );
  }

  get dispensaryInfo() {
    return this._localStorage.retrieveItem('dispensaryInfo');
  }

  initForm() {
    this.form = this._fb.group({
      sameAsLegalName: [null],
      dispensary_name: [null, Validators.required],
      phone_number: [null],
      address_line_1: [null, Validators.required],
      address_line_2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      license_number: [null, Validators.required],
      license_state: [null, Validators.required],
      license_issue_date: [null, Validators.required],
      license_expiration: [null, Validators.required],
      license_photo: [null, Validators.required],
    });

    const dispensaryInfo = this.dispensaryInfo;
    if (dispensaryInfo) {
      this.form.setValue({ ...dispensaryInfo, license_photo: null });
    }
  }

  initListeners() { // register listeners here...
    this.listenSameAsLegalName();
    this.listenFormChanges();
  }

  listenFormChanges() {

  }

  listenSameAsLegalName() {
    this.f.sameAsLegalName.valueChanges
      .pipe(
        takeUntil(this._unsubscribe$)
      )
      .subscribe((value) => {
        if (value) {
          if (!this.companyInfo) {
            this.companyInfo = this._localStorage.retrieveItem('companyInfo');
          }

          const {
            legal_company_name,
            address_line_1,
            address_line_2,
            city,
            state,
            zip,
          } = this.companyInfo;

          this.f.dispensary_name.setValue(legal_company_name);
          this.f.address_line_1.setValue(address_line_1);
          this.f.address_line_2.setValue(address_line_2);
          this.f.city.setValue(city);
          this.f.state.setValue(state);
          this.f.zip.setValue(zip);
        } else {
          this.f.dispensary_name.setValue(null);
          this.f.address_line_1.setValue(null);
          this.f.address_line_2.setValue(null);
          this.f.city.setValue(null);
          this.f.state.setValue(null);
          this.f.zip.setValue(null);
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.initListeners();
  }

  onLicenseUpload(fileList: FileList) {
    const file = fileList[0];
    if (file) {
      this.f.license_photo.setValue(file);
      this.fileName = file.name;

      getBase64Format(file)
        .then(result => {
          this._toastr.info('Selected file was process successfully.');
          const { value } = this.form;
          const { name, type } = file;
          this.fileName = name;
          const license_photo = {
            fileName: name,
            fileType: type,
            file: result
          }

          this.form.patchValue(
            { ...value, license_photo },
            { emitEvent: true }
          );
        })
        .catch(() => {
          this._toastr.error('Failed to process selected file.')
          this.f.license_photo.setValue(null);
        });
    } else {
      this.f.license_photo.setValue(null);
    }
  }

  proceed() {
    const contactInfo = this._formStates.getState('contactInfo');

    const { PROCESSING } = licenseStatus;
    const companyInfo = this._localStorage.retrieveItem('companyInfo');

    const { legal_company_name } = companyInfo;
    const coAddress1 = companyInfo.address_line_1;
    const coAddress2 = companyInfo.address_line_2;
    const coCity = companyInfo.city;
    const coState = companyInfo.state;
    const coZip = companyInfo.zip;

    const {
      first_name,
      last_name,
      drivers_license_number,
      drivers_license_state,
      drivers_license_photo
    } = contactInfo
    const contactAddress1 = contactInfo.address_line_1;
    const contactAddress2 = contactInfo.address_line_2;
    const contactCity = contactInfo.city;
    const contactState = contactInfo.state;
    const contactZip = contactInfo.zip;

    const { value } = this.form;
    const {
      dispensary_name,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      license_number,
      license_state,
      license_issue_date,
      license_expiration ,
      license_photo,
    } = value

    const finalData = {
      email: '',
      first_name: (first_name as string),
      last_name: (last_name as string),
      admin_phone_number: '',
      admin_mobile_number: '',
      identification_number: '',
      identification_state: '',
      legal_company_name: (legal_company_name as string),
      company_address_line_1: (coAddress1 as string),
      company_address_line_2: (coAddress2 as string),
      company_city: (coCity as string),
      company_state: (coState as string),
      company_zip: (coZip as string),
      admin_first_name: (first_name as string),
      admin_last_name: (last_name as string),
      admin_address_line_1: (contactAddress1 as string),
      admin_address_line_2: (contactAddress2 as string),
      admin_city: (contactCity as string),
      admin_state: (contactState as string),
      admin_zip: (contactZip as string),
      admin_drivers_license_number: (drivers_license_number as string),
      admin_drivers_license_state: (drivers_license_state as string),
      dispensary_name: (dispensary_name as string),
      dispensary_address_line_1: (address_line_1 as string),
      dispensary_address_line_2: (address_line_2 as string),
      dispensary_city: (city as string),
      dispensary_state: (state as string),
      dispensary_zip: (zip as string),
      dispensary_license_number: (license_number as string),
      dispensary_license_state: (license_state as string),
      dispensary_license_issue_date: (license_issue_date as string),
      dispensary_license_expiration_date: (license_expiration as string),
      dispensary_license_status: PROCESSING,
      admin_drivers_photo: drivers_license_photo,
      dispensary_license_photo: license_photo
    };

    // const rawFiles = [
    //   { admin_drivers_photo: (drivers_license_photo as File) },
    //   { dispensary_license_photo: (license_photo as File) }
    // ];

    this._localStorage.storeLocal('dispensaryInfo', value);
    this._localStorage.storeLocal('finalData', finalData);

    this._auth.register(finalData)
      .subscribe(
        (result: any) => {
          this._toastr.success(result.message);
          this._router.navigateByUrl('/account/thank-you');
          const { value } = this.form;

          this._router.navigateByUrl('/account/thank-you');
        },
        (errorResult) => {
          console.log("signup debug error", errorResult);
          const { error } = errorResult;
          this._toastr.error('Error occurred. Unable to complete signup process.');
        }
      );
  }
}
