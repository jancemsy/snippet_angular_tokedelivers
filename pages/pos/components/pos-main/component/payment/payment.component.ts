import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosService } from 'src/app/services/pos/pos.service';
import { DialogLoyaltyPointsComponent } from '../../../shared/components/dialog-loyalty-points/dialog-loyalty-points.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnInit {

  public posPaymentMode : string;

  private _unsubscribe$ = new Subject<any>();

  public isTransactionComplete : boolean;

  constructor(
    private _posService: PosService,
    private _posMainService: PosMainService,
    private _changeDetectorRef : ChangeDetectorRef,
    private _dialog: MatDialog,
  ) {
    this._posService.isTransactionComplete
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.isTransactionComplete = successResponse;
              console.log("TRANS",this.isTransactionComplete);
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_MODE] fail :', errorResponse)
          }
    );

    this._posMainService.posPaymentMode
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posPaymentMode = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_PAYMENT_MODE] fail :', errorResponse)
          }
    );
   }

  ngOnInit(): void {
  }

  onCash(){
    this._posMainService.setPosPaymentMode('cash');
  }

  onDebit(){
    this._posMainService.setPosPaymentMode('debit');
  }

  onCanPay(){
    this._posMainService.setPosPaymentMode('can-pay');
  }

  onShowLoyaltyPoints() {
    this._dialog.open(DialogLoyaltyPointsComponent, {
      panelClass: ['pos-dialog-container']
    });
  }
}
