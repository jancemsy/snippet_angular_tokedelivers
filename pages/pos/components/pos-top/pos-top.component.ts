import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, NgZone, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-pos-top',
  templateUrl: './pos-top.component.html',
  styleUrls: ['./pos-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosTopComponent implements OnInit {
  public posMode : string;
  public posPaymentMode : string;
  public posDebitPaymentStatus : string;
  public isTransactionComplete : boolean;

  private _unsubscribe$ = new Subject<any>();

  constructor(
      private _posService: PosService,
      private _posSideService: PosSideService,
      private _posMainService: PosMainService,
      private _changeDetectorRef : ChangeDetectorRef
    ) {
    this._posService.posMode
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posMode = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_MODE] fail :', errorResponse)
          }
    );

    this._posService.isTransactionComplete
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.isTransactionComplete = successResponse;
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
            console.log('[POS_MODE] fail :', errorResponse)
          }
    );

    this._posMainService.posDebitPaymentStatus
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posDebitPaymentStatus = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_MODE] fail :', errorResponse)
          }
    );
  }

  ngOnInit(): void {
  }

  onBack() {
    if(this.posPaymentMode != 'menu' && !this.isTransactionComplete){
      if(this.posDebitPaymentStatus != 'processing'){
        this._posMainService.setPosPaymentMode('menu');
        this._posMainService.setPosDebitPaymentStatus('waiting');
        this._posService.setTransactionComplete(false);
        this._posService.setPosMode('checkout')
      }
    }else{
      if(this.isTransactionComplete){
        this._posSideService.resetCartItems();
      }
      this._posMainService.setPosDebitPaymentStatus('waiting');
      this._posMainService.setPosPaymentMode('menu');
      this._posService.setTransactionComplete(false);
      this._posService.setPosMode('register')
    }

  }

  onMenu() {
    // this._posService.setPosMode('register')
  }

  onScan(){
    this._posService.setPosMode('scan')
  }

  onAddCustomer() {
    this._posService.setPosMode('customers')
  }

}
