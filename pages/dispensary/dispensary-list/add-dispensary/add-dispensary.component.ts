import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DispensaryService } from 'src/app/services/dispensaries/dispensary.service';

import { IStepperItem } from 'src/app/models';
import { btnActionTypes } from 'src/app/@core/constants';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/utilities/local-storage.service';

@Component({
  selector: 'app-add-dispensary',
  templateUrl: './add-dispensary.component.html',
  styleUrls: ['./add-dispensary.component.scss']
})
export class AddDispensaryComponent implements OnInit {
  btnActionTypes = btnActionTypes;
  activeStepper: IStepperItem;
  finishLabel: string;
  isFinished: boolean;
  stepperItems: IStepperItem[];

  dispensaryInfo: any;

  constructor(
    public modal: NgbActiveModal,
    private _dispensaryService: DispensaryService,
    private _localStorage: LocalStorageService,
    private _toastr: ToastrService,
  ) {
    this.initFormValues();
  }

  initFormValues() {
    const loginInfo = this._localStorage.retrieveItem('loginInfo');

    this.dispensaryInfo = {
      company_id: loginInfo.user_company_id,
      dispensary_name: null,
      dispensary_address_line_1: null,
      dispensary_address_line_2: null,
      dispensary_city: null,
      dispensary_state: null,
      dispensary_zip: null,
      dispensary_license_number: null,
      dispensary_license_state: null,
      dispensary_license_issue_date: null,
      dispensary_license_expiration_date: null,
      dispensary_file: null,
    };

    this.stepperItems = [
      { label: 1, value: 1, stepTitle: '1. Dispensary Informtion',  isActive: true },
      { label: 2, value: 2, stepTitle: '2. Employees' },
      { label: 3, value: 3, stepTitle: '3. Dispensary Opening Times' },
    ];

    this.activeStepper = this.stepperItems[0];

    this.finishLabel = null;
    this.isFinished = false;
  }

  ngOnInit(): void {
  }

  stepperActions(event) {
    this.activeStepper = this.stepperItems[event.value - 1];
  }

  onCancel(event) {
    this.modal.close(event);
  }

  onBack(event) {
    if (event.screen > 1) {
      this.stepperItems.map((item) => {
        if (item.value === event.screen) {
          item.isActive = false;
          item.isSuccess = true;
          item.label = event.screen;
        }

        if (item.value === (event.screen - 1)) {
          item.isActive = true;
          this.activeStepper = item;
          item.label = item.value;
        }
      });
    }
  }

  onComplete(data) {
    if (data.event === 0) {
      this.modal.close(event);
    } else {
      this.initFormValues();
    }
  }

  onNext(event) {
    const { screen } = event;
    this.updateScreenState(event.screen);
    this.updateFormData(event.values)

    if (screen >= 3) {
      this.submitData();
    }
  }

  submitData() {
    this._dispensaryService.addDispensary(this.dispensaryInfo)
      .subscribe(
        (successResponse: any) => {
          const { message } =  successResponse;
          this._toastr.success(message || 'Dispensary successfully added.');
        },
        (errorResponse: any) => {
          const { error } =  errorResponse;
          if (error) {
            this._toastr.error(error.message || 'Error saving dispensary.');
          } else {
            this._toastr.error(error || 'Error saving dispensary.');
          }
        }
      )
  }

  updateScreenState(screen) {
    if (screen < 4) {
      this.stepperItems.map((item) => {
        if (item.value === screen) {
          item.isActive = false;
          item.isSuccess = true;
          item.label = '✓';
        }

        if (item.value === (screen + 1)) {
          item.isActive = true;
          this.activeStepper = item;
        }
      });

      if (screen === 3) {
        this.finishLabel = 'Finished Adding Dispensary';
        this.isFinished = true;
      }
    }
  }

  updateFormData(data) {
    this.dispensaryInfo = { ...this.dispensaryInfo, ...data };
    console.log(this.dispensaryInfo);
  }
}
