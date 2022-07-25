import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxErrorsDirective } from '@hackages/ngxerrors';
import { FileUploader } from 'ng2-file-upload';

import { allowedMimeTypes } from 'src/app/@core/constants';

@Component({
  selector: 'app-dispensary-info-form',
  templateUrl: './dispensary-info-form.component.html',
  styleUrls: ['./dispensary-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispensaryInfoFormComponent implements OnInit {
  allowedMimeTypes = allowedMimeTypes;
  form: FormGroup;
  fileName: string;

  @Input() values: any;
  @Output() cancel = new EventEmitter<any>();
  @Output() next = new EventEmitter<any>();

  @ViewChild('dispensaryNameErrors', { static: false }) dispensaryNameErrors: NgxErrorsDirective;
  @ViewChild('address1Errors', { static: false }) address1Errors: NgxErrorsDirective;
  @ViewChild('cityErrors', { static: false }) cityErrors: NgxErrorsDirective;
  @ViewChild('stateErrors', { static: false }) stateErrors: NgxErrorsDirective;
  @ViewChild('zipErrors', { static: false }) zipErrors: NgxErrorsDirective;
  @ViewChild('licenseNoErrors', { static: false }) licenseNoErrors: NgxErrorsDirective;
  @ViewChild('licenseStateErrors', { static: false }) licenseStateErrors: NgxErrorsDirective;
  @ViewChild('licenseDateErrors', { static: false }) licenseDateErrors: NgxErrorsDirective;
  @ViewChild('licenseExpireErrors', { static: false }) licenseExpireErrors: NgxErrorsDirective;

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024
  });

  constructor(
    private _fb: FormBuilder,
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

  initForm() {
    this.form = this._fb.group({
      dispensary_name: [null, Validators.required],
      dispensary_address_line_1: [null, Validators.required],
      dispensary_address_line_2: [null],
      dispensary_city: [null, Validators.required],
      dispensary_state: [null, Validators.required],
      dispensary_zip: [null, Validators.required],
      dispensary_license_number: [null, Validators.required],
      dispensary_license_state: [null, Validators.required],
      dispensary_license_issue_date: [null, Validators.required],
      dispensary_license_expiration_date: [null, Validators.required],
      dispensary_file: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.values) {
      const {
        dispensary_name,
        dispensary_address_line_1,
        dispensary_address_line_2,
        dispensary_city,
        dispensary_state,
        dispensary_zip,
        dispensary_license_number,
        dispensary_license_state,
        dispensary_license_issue_date,
        dispensary_license_expiration_date,
        dispensary_file,
      } = this.values;

      this.form.setValue({
        dispensary_name,
        dispensary_address_line_1,
        dispensary_address_line_2,
        dispensary_city,
        dispensary_state,
        dispensary_zip,
        dispensary_license_number,
        dispensary_license_state,
        dispensary_license_issue_date,
        dispensary_license_expiration_date,
        dispensary_file,
      });
    }
  }

  onCancel() {
    this.cancel.emit(1);
  }

  onLicenseUpload(fileList: FileList) {
    const file = fileList[0];
    this.f.dispensary_file.setValue(file)
  }

  proceed() {
    this.next.emit({ screen: 1, values: this.form.value });
  }
}
