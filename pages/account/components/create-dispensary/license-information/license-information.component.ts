import { Component, OnInit, ViewChild, ChangeDetectionStrategy, HostListener, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload';
import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

import { FormDataService } from '../services/form-data.service';
import { allowedMimeTypes } from 'src/app/@core/constants';
import { getBase64Format } from 'src/app/@core/functions/file-upload-utils.function';
import { IStepperItem } from 'src/app/models';
import { SignupStepsService } from '../../../services/signup-steps.service';

@Component({
  templateUrl: './license-information.component.html',
  styleUrls: ['./license-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LicenseInformationComponent implements OnInit {
  private _stepperItems: IStepperItem[] = [];
  allowedMimeTypes = allowedMimeTypes;
  form: FormGroup;
  fileName: string;

  @ViewChild('firstNameErrors', { static: false }) firstNameErrors: NgxErrorsDirective;
  @ViewChild('lastNameErrors', { static: false }) lastNameErrors: NgxErrorsDirective;
  @ViewChild('address1Errors', { static: false }) address1Errors: NgxErrorsDirective;
  @ViewChild('cityErrors', { static: false }) cityErrors: NgxErrorsDirective;
  @ViewChild('stateErrors', { static: false }) stateErrors: NgxErrorsDirective;
  @ViewChild('zipErrors', { static: false }) zipErrors: NgxErrorsDirective;
  @ViewChild('licenseNoErrors', { static: false }) licenseNoErrors: NgxErrorsDirective;
  @ViewChild('licenseStateErrors', { static: false }) licenseStateErrors: NgxErrorsDirective;

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
    private _fb: FormBuilder,
    private _formStates:  FormDataService,
    private _localStorage: LocalStorageService,
    private _router: Router,
    private _signUpSteps: SignupStepsService,
    private _toastr: ToastrService,
  ) {
    this.initForm();
  }

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

  get contactInfo() {
    return this._localStorage.retrieveItem('contactInfo');
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
      drivers_license_number: [null, Validators.required],
      drivers_license_state: [null, Validators.required],
      drivers_license_photo: [null, Validators.required],
    });

    const contactInfo = this.contactInfo;
    if (contactInfo) {
      this.form.setValue({ ...contactInfo })
    }
  }

  initListeners() {
    // register listeners here...
    this._signUpSteps.stepperState
      .subscribe((items) => {
        if (items) {
          this._stepperItems = items;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes: ', changes);
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
      this.f.drivers_license_photo.setValue(file);
      this.fileName = file.name;

      getBase64Format(file)
        .then(result => {
          this._toastr.info('Selected file was process successfully.');
          const { value } = this.form;
          const { name, type } = file;
          this.fileName = name;
          const drivers_license_photo = {
            fileName: name,
            fileType: type,
            file: result
          }

          this.form.patchValue(
            { ...value, drivers_license_photo },
            { emitEvent: true }
          );
        })
        .catch(() => {
          this._toastr.error('Failed to process selected file.')
          this.f.drivers_license_photo.setValue(null);
        });
    } else {
      this.f.drivers_license_photo.setValue(null);
    }
  }

  proceed() {
    const { value } = this.form;
    this._localStorage.storeLocal('contactInfo', value);
    this._formStates.setStateFor('contactInfo', value);
    this._goNext(3);
    this._router.navigateByUrl('/account/create-dispensary/step4');
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
}
