import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DispensaryService } from 'src/app/services/dispensaries/dispensary.service';

@Component({
  selector: 'app-edit-dispensary',
  templateUrl: './edit-dispensary.component.html',
  styleUrls: ['./edit-dispensary.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDispensaryComponent implements OnInit {
  formHasChanged: boolean;

  @Input() dispensaryInfo: any = {};
  @Output() cancel = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();
  @Output() sectionChange = new EventEmitter<any>();

  constructor(
    private _activeModal: NgbActiveModal,
    private _dispensaryService: DispensaryService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancel.emit({ eventId: 0 });
    this._activeModal.close({ eventId: 0 });
  }

  onSave() {
    this.save.emit({ eventId: 1, data: this.dispensaryInfo });
    const { working_hours } = this.dispensaryInfo.details;

    this.dispensaryInfo.details.working_hours = working_hours
      .map((item: any) => {
        item.start = item.is_closed ? '00:00' : item.start;
        item.end = item.is_closed ? '00:00' : item.end;
        return item;
      });

    this._dispensaryService.updateDispensary(this.dispensaryInfo)
      .subscribe(
        (successResponse: any) => {
          console.log(successResponse);
          const { message } = successResponse;
          this._toastr.success(message || 'Dispensary updated!')
          this._activeModal.close({ eventId: 1, data: this.dispensaryInfo });
        },
        (errorResponse: any) => {
          console.log(errorResponse);
          const { error } = errorResponse;
          this._toastr.error('Dispensary update failed.' );
        }
      );
  }

  onChange(event) {
    this.formHasChanged = true;
    const { dispensaryInfo } = event;
    this.dispensaryInfo = { ...this.dispensaryInfo, ...dispensaryInfo };
    this.sectionChange.emit({ eventId: 2, dispensaryInfo: this.dispensaryInfo });
  }
}
