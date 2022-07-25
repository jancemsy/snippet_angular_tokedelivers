import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { allowedMimeTypes } from 'src/app/@core/constants';

@Component({
  selector: 'app-dispensary-license-section',
  templateUrl: './dispensary-license-section.component.html',
  styleUrls: ['./dispensary-license-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispensaryLicenseSectionComponent implements OnDestroy, OnInit {
  form: FormGroup;
  allowedMimeTypes = allowedMimeTypes;

  @Input() dispensaryInfo: any;
  @Output() sectionChange = new EventEmitter<any>();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _fb: FormBuilder,
  ) {
    this.initForm();
    this.initListeners()
  }

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: allowedMimeTypes,
    maxFileSize: 150 * 1024 * 1024
  });

  get f() { return this.form.controls; }

  initForm() {
    this.form = this._fb.group({
      license_number: [null, Validators.required],
      license_state: [null, Validators.required],
      license_issue_date: [null, Validators.required],
      license_expiration: [null, Validators.required]
    })
  }

  initListeners() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((values) => {
        this.sectionChange.emit({ screenId: 1,  dispensaryInfo: values });
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    if (this.dispensaryInfo) {
      const {
        license_number,
        license_state,
        license_issue_date,
        license_expiration,
      } = this.dispensaryInfo;

      const formValues = {
        license_number: license_number || null,
        license_state: license_state || null,
        license_issue_date: license_issue_date || null,
        license_expiration: license_expiration || null,
      };

      this.form.setValue(formValues);
    }
  }

  onLicenseUpload(fileList: FileList) {
    console.log(fileList);
  }
}
