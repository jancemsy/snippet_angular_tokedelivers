import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InfoCardConfig } from 'src/app/models';
import { AddDiscountPromoStateService } from 'src/app/services/state-management/discount-promo/add-discount-promo/add-discount-promo-state.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';
import { handleError } from 'src/app/@core/functions/handle-error-utils.functions'

@Component({
  selector: 'app-add-discount-promo',
  templateUrl: './add-discount-promo.component.html',
  styleUrls: ['./add-discount-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDiscountPromoComponent implements OnInit {

  public title : string;
  public activeSlug : string;
  public configItems : InfoCardConfig[];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    public modal: NgbActiveModal,
    private _addDiscountPromoState: AddDiscountPromoStateService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    this._addDiscountPromoState.title
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.title = successResponse;
          },
          (errorResponse: any) => {
            console.log('[TITLE] fail :', errorResponse)
          }
    );

    this._addDiscountPromoState.infoCardConfigItems
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.configItems = successResponse;
          },
          (errorResponse: any) => {
            console.log('[INFO_CARD_CONFIG_ITEMS] fail :', errorResponse)
          }
    );

    this._addDiscountPromoState.activeSlug
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.activeSlug = successResponse;
          },
          (errorResponse: any) => {
            console.log('[INFO_CARD_CONFIG_ITEMS] fail :', errorResponse)
          }
    );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onBackButton(){
    this._addDiscountPromoState.reset();
  }

  onModalClose(){

    // add confirmation if only theres active slug
    if (this.activeSlug) {
      let dialogRef =  this.dialog.open(ConfirmationDialogComponent, {
        data: "Are you sure you want to leave and clear all information?",
        panelClass: ['custom-rounded-dialog', 'no-title']
      })

      dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
        (confirmed: boolean) => {
          if (confirmed) {
            this._addDiscountPromoState.reset();
            this.modal.dismiss();
          }
        }
      );

    } else {
      this._addDiscountPromoState.reset();
      this.modal.dismiss();
    }

  }

  onModalCloseCreated($event){
    let dialogRef =  this.dialog.open(SuccessDialogComponent, {
      data: {
        success: true,
        message: $event
      },
      panelClass: ['custom-rounded-dialog', 'no-title']
    })

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribe$)).subscribe(
      () => {

        this._addDiscountPromoState.reset();
        this.modal.dismiss();
      }
    );

    dialogRef.backdropClick().pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      // Close the dialog
      this._addDiscountPromoState.reset();
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


  onCardSelect(index){
    this._addDiscountPromoState.setTitle(this.configItems[index].title);
    this._addDiscountPromoState.setActiveSlug(this.configItems[index].slug);
  }

  getItemTitleBySlug(slug : string){
    var item = this.configItems.find(configItem => {
      return configItem.slug === slug
    })
    return item.title;
  }

}
