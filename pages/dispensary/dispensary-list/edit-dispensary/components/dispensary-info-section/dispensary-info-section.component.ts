import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dispensary-info-section',
  templateUrl: './dispensary-info-section.component.html',
  styleUrls: ['./dispensary-info-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispensaryInfoSectionComponent implements OnDestroy, OnInit {
  form: FormGroup;

  @Input() dispensaryInfo: any = {};
  @Output() sectionChange = new EventEmitter<any>();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _fb: FormBuilder,
  ) {
    this.initForm();
    this.initListeners();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    if (this.dispensaryInfo) {
      const {
        dispensary_id,
        company_id,
        dispensary_name,
        email,
        phone_number,
        dispensary_address_line_1,
        dispensary_address_line_2,
        dispensary_city,
        dispensary_state,
        dispensary_zip,
        license_number,
        license_state,
        license_issue_date,
        license_expiration,
      } = this.dispensaryInfo;

      this.form.setValue({
        dispensary_id,
        company_id: company_id || null,
        dispensary_name,
        email: email || null,
        phone_number: phone_number || null,
        dispensary_address_line_1,
        dispensary_address_line_2,
        dispensary_city,
        dispensary_state,
        dispensary_zip,
        license_number: license_number || null,
        license_state: license_state || null,
        license_issue_date: license_issue_date || null,
        license_expiration: license_expiration || null,
      });
    }
  }

  initListeners() {
    this.form.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((values) => {
        this.sectionChange.emit({ screenId: 0,  dispensaryInfo: values });
      });
  }

  initForm() {
    this.form = this._fb.group({
      dispensary_id: [null],
      company_id: [null],
      dispensary_name: [null, Validators.required],
      email: [null, Validators.email],
      phone_number: [null],
      dispensary_address_line_1: [null, Validators.required],
      dispensary_address_line_2: [null],
      dispensary_city: [null, Validators.required],
      dispensary_state: [null, Validators.required],
      dispensary_zip: [null, Validators.required],
      license_number: [null, Validators.required],
      license_state: [null, Validators.required],
      license_issue_date: [null, Validators.required],
      license_expiration: [null, Validators.required],
    });
  }

}
