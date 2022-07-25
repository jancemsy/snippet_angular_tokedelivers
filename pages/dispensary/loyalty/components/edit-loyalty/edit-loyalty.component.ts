import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/shared/components/success-dialog/success-dialog.component';

@Component({
  selector: 'app-edit-loyalty',
  templateUrl: './edit-loyalty.component.html',
  styleUrls: ['./edit-loyalty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLoyaltyComponent implements OnInit {

  @Input() item : any;
  private _unsubscribe$ = new Subject<any>();
  
  public title : string;

  constructor(
    public modal: NgbActiveModal,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
      console.log(this.item);
      if(this.item.type.abbr == 'ptr'){
        this.title = "Points & Tiers Rule";
      }else if(this.item.type.abbr == 'lr'){
        this.title = "Loyalty Reward";
      }

  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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

  onModalCloseUpdated($event){
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
    })
  }

}
