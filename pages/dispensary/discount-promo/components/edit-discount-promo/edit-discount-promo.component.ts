import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { handleError } from 'src/app/@core/functions/handle-error-utils.functions'

@Component({
  selector: 'app-edit-discount-promo',
  templateUrl: './edit-discount-promo.component.html',
  styleUrls: ['./edit-discount-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDiscountPromoComponent implements OnInit {

  @Input() item : any;
  private _unsubscribe$ = new Subject<any>();

  constructor(
    public modal: NgbActiveModal,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onShowSuccess($event){
    let dialogRef =  this.dialog.open(SuccessDialogComponent, {
      data: {
        success: true,
        message: $event
      },
      panelClass: ['custom-rounded-dialog', 'no-title']
    })

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      () => {
        this.modal.dismiss();
      }
    );

    dialogRef.backdropClick().pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      // Close the dialog
      this.modal.dismiss();
    });
  }

  onShowError($event) {
    let msg = "";

    if (typeof $event == 'object') {
      msg = 'Fail! <br>';
      msg += handleError($event)
    } else {
      msg = 'Error Has Occurred';
    }

    this.dialog.open(SuccessDialogComponent, {
      data: {
        success: false,
        message: msg
      },
      panelClass: ['custom-rounded-dialog', 'no-title']
    });
  }


  onModalClose(){

    let dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to leave and clear all information?",
      panelClass: ['custom-rounded-dialog', 'no-title']
    })

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      (confirmed: boolean) => {
        if (confirmed) {
          this.modal.dismiss();
        }
      }
    );

  }

}
