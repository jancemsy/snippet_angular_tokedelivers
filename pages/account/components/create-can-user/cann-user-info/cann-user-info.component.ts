import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';
import { allowedMimeTypes, licenseStatus } from 'src/app/@core/constants';
import { getBase64Format } from 'src/app/@core/functions/file-upload-utils.function';
import { FileUploader } from 'ng2-file-upload';

@Component({
  templateUrl: './cann-user-info.component.html',
  styleUrls: ['./cann-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CannUserInfoComponent implements OnInit {
  private _unsubscribe$ = new Subject<any>();

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024
  });

  form: FormGroup;
  isMedicalUse: boolean;
  allowedMimeTypes = allowedMimeTypes;
  dlFileName: string;
  prescriptionFileName: string;

  @ViewChild('firstNameErrors', { static: false }) firstNameErrors: NgxErrorsDirective;
  @ViewChild('lastNameErrors', { static: false }) lastNameErrors: NgxErrorsDirective;
  @ViewChild('address1Errors', { static: false }) address1Errors: NgxErrorsDirective;
  @ViewChild('cityErrors', { static: false }) cityErrors: NgxErrorsDirective;
  @ViewChild('stateErrors', { static: false }) stateErrors: NgxErrorsDirective;
  @ViewChild('zipErrors', { static: false }) zipErrors: NgxErrorsDirective;
  @ViewChild('licenseNumberErrors', { static: false }) licenseNumberErrors: NgxErrorsDirective;
  @ViewChild('licenseStateErrors', { static: false }) licenseStateErrors: NgxErrorsDirective;
  @ViewChild('licensePhotoErrors', { static: false }) licensePhotoErrors: NgxErrorsDirective;
  @ViewChild('prescriptionPhotoErrors', { static: false }) prescriptionPhotoErrors: NgxErrorsDirective;

  get f() { return this.form.controls; }

  get firstNameInvalid() {
    if (!this.firstNameErrors) {
      return false;
    }

    return (
      this.firstNameErrors.hasError('required', 'touched')
    );
  }

  get lastNameInvalid() {
    if (!this.lastNameErrors) {
      return false;
    }

    return (
      this.lastNameErrors.hasError('required', 'touched')
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

  get licenseNumberInvalid() {
    if (!this.licenseNumberErrors) {
      return false;
    }

    return (
      this.licenseNumberErrors.hasError('required', 'touched')
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

  get licensePhotoInvalid() {
    if (!this.licensePhotoErrors) {
      return false;
    }

    return (
      this.licensePhotoErrors.hasError('required', 'touched')
    );
  }

  get prescriptionPhotoInvalid() {
    if (!this.prescriptionPhotoErrors) {
      return false;
    }

    return (
      this.prescriptionPhotoErrors.hasError('required', 'touched')
    );
  }

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    private _localStorage: LocalStorageService,
    private _toastr: ToastrService,
  ) {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      address_line_1: [null, Validators.required],
      address_line_2: [null],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zip: [null, Validators.required],
      identification_number: [null, Validators.required],
      identification_state: [null, Validators.required],
      drivers_license_photo: [null, Validators.required],
      prescription_photo: [null],
    });
  }

  ngOnInit(): void {
  }

  onFileUpload(fileList: FileList, field: string) {
    console.log('event: ', fileList[0]);

    const file = fileList[0];
    if (file) {
      this.f[field].setValue(file);
      if (field === 'drivers_license_photo') {
        this.dlFileName = field === 'drivers_license_photo' ? file.name : null;
      }

      if (field === 'prescription_photo') {
        this.prescriptionFileName = field === 'prescription_photo' ? file.name : null;
      }

      console.log(this.f[field].value);

      getBase64Format(file)
        .then(result => {
          this._toastr.info('Selected file was process successfully.');
          const { value } = this.form;
          const { name, type } = file;

          if (field === 'drivers_license_photo') {
            const drivers_license_photo = {
              fileName: name,
            fileType: type,
              file: result
            };

            this.form.patchValue(
              { ...value, drivers_license_photo },
              { emitEvent: true }
            );

            return true;
          }

          if (field === 'prescription_photo') {
            const prescription_photo = {
              fileName: name,
            fileType: type,
              file: result
            };

            this.form.patchValue(
              { ...value, prescription_photo },
              { emitEvent: true }
            );

            return true;
          }
        })
        .catch(() => {
          this._toastr.error('Failed to process selected file.')
          this.f[field].setValue(null);
        });
    } else {
      this.f[field].setValue(null);
    }
  }

  proceed() {
    const { value } = this.form;

    const data = {
      ...value,
      type: this.isMedicalUse ? 'medical' : 'adult',
    };

    this._auth.registerCannabisUser(data)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (result: any) => {
          this._toastr.success(result.message);
          this._localStorage.storeLocal('contactInfo', value);
          this._router.navigateByUrl('/account/thank-you');
        },
        (errorResult) => {
          const { error } = errorResult;
          this._toastr.error(error.message);
        }
      );
  }
}
