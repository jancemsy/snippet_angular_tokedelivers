import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosCartSummary } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-trans-complete',
  templateUrl: './trans-complete.component.html',
  styleUrls: ['./trans-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransCompleteComponent implements OnInit {

  public isPrinted : boolean;
  public isEmailed : boolean;
  public isNonReceipt : boolean;
  public isReceiptFinished : boolean;
  public isBackToRegister : boolean;
  public posPaymentMode : string;
  public posChange : number;
  public posOrderNumber : string;
  public cartSummary : PosCartSummary[];


  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _posService : PosService,
    private _posSideService : PosSideService,
    private _posMainService : PosMainService,
    private _changeDetectorRef : ChangeDetectorRef
  ) {

    this.isPrinted = false;
    this.isEmailed = false;
    this.isNonReceipt = false;
    this.isReceiptFinished = false;
    this.isBackToRegister = false;

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

    this._posSideService.posChange
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posChange = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_PAYMENT_MODE] fail :', errorResponse)
          }
    );

    this._posSideService.posOrderNumber
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posOrderNumber = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_PAYMENT_MODE] fail :', errorResponse)
          }
    );

    this._posSideService.cartSummary
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.cartSummary = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_PAYMENT_MODE] fail :', errorResponse)
          }
    );

   }

  ngOnInit(): void {
  }

  onPrintReceipt(){
    if(!this.isReceiptFinished){
      this.isPrinted = true;
      this.isReceiptFinished = true;
      this.showBackToRegister();
    }
  }

  onEmailReceipt(){
    if(!this.isReceiptFinished){
      this.isEmailed = true;
      this.isReceiptFinished = true;
      this.showBackToRegister();
    }
  }

  onNonReceipt(){
    if(!this.isReceiptFinished){
      this.isNonReceipt = true;
      this.isReceiptFinished = true;
      this.showBackToRegister();
    }
  }

  showBackToRegister(){
    setTimeout(() => {
      this.isBackToRegister = true;
      this._changeDetectorRef.markForCheck();
    }, 2000);
  }

  onBackToRegister(){
    this._posSideService.resetCartItems();
    this._posMainService.setPosDebitPaymentStatus('waiting');
    this._posMainService.setPosPaymentMode('menu');
    this._posService.setPosMode('register');
    this._posService.setTransactionComplete(false);
  }



}
