import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { handleError } from 'src/app/@core/functions/handle-error-utils.functions';
import { InfoCardConfig } from 'src/app/models';
import { AddLoyaltyStateService } from 'src/app/services/state-management/loyalty/add-loyalty/add-loyalty-state.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-loyalty',
  templateUrl: './add-loyalty.component.html',
  styleUrls: ['./add-loyalty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLoyaltyComponent implements OnInit {

  public title : string;
  public activeSlug : string[];
  public configItems : InfoCardConfig[];

  private _unsubscribe$ = new Subject<any>();

  constructor(
    public modal: NgbActiveModal,
    private _addLoyaltyState: AddLoyaltyStateService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    this._addLoyaltyState.title
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.title = successResponse;
          },
          (errorResponse: any) => {
            console.log('[TITLE] fail :', errorResponse)
          }
    );

    this._addLoyaltyState.infoCardConfigItems
    .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.configItems = successResponse;
          },
          (errorResponse: any) => {
            console.log('[INFO_CARD_CONFIG_ITEMS] fail :', errorResponse)
          }
    );

    this._addLoyaltyState.activeSlug
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

  onBackButton(){
    this._addLoyaltyState.reset();
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
            this._addLoyaltyState.reset();
            this.modal.dismiss();
          }
        }
      );

    } else {
      this._addLoyaltyState.reset();
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

        this._addLoyaltyState.reset();
        this.modal.dismiss();
      }
    );

    dialogRef.backdropClick().pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
      // Close the dialog
      this._addLoyaltyState.reset();
      this.modal.dismiss();
    })
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
    this._addLoyaltyState.setTitle(this.configItems[index].title);
    this._addLoyaltyState.setActiveSlug(this.configItems[index].slug);
  }

  getItemTitleBySlug(slug : string){
    var item = this.configItems.find(configItem => {
      return configItem.slug === slug
    })
    return item.title;
  }
}
