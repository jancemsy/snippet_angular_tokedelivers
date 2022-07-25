import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosCartItem, PosCartSummary } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-debit',
  templateUrl: './debit.component.html',
  styleUrls: ['./debit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DebitComponent implements OnInit {

  public posDebitPaymentStatus : string;
  private _unsubscribe$ = new Subject<any>();

  public cartSummary : PosCartSummary;
  public cartItems : PosCartItem[];

  constructor(
    private _posService: PosService,
    private _posMainService: PosMainService,
    private _posSideService: PosSideService,
    private _changeDetectorRef : ChangeDetectorRef
  ) {
    this._posMainService.posDebitPaymentStatus
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.posDebitPaymentStatus = successResponse;
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[POS_DEBIT_PAYMENT_MODE] fail :', errorResponse)
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
        console.log('[CART_ITEMS] fail :', errorResponse)
      }
    );

    this._posSideService.cartItems
    .pipe( takeUntil(this._unsubscribe$) )
    .subscribe(
      (successResponse: any) => {
          this.cartItems = successResponse;
          this._changeDetectorRef.markForCheck();
      },
      (errorResponse: any) => {
        console.log('[CART_ITEMS] fail :', errorResponse)
      }
    );
  }

  ngOnInit(): void {
    this.dummyDebitProcess();
  }

  dummyDebitProcess(){
    setTimeout(()=>{                         
      this._posMainService.setPosDebitPaymentStatus('processing');

      setTimeout(()=>{      
        let order_data = this._posService.prepareOrder(this.cartItems, this.cartSummary, { method : 'debit', amount : this.cartSummary.total});

        this._posService.addOrder(order_data)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
            this._posSideService.setPosOrderNumber(successResponse.data.order_number);
            this._posSideService.setPosChange(parseFloat(successResponse.data.change));
            this._posMainService.setPosDebitPaymentStatus('finished');
            this._posService.setTransactionComplete(true);
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[ORDER_FAIL] fail :', errorResponse)
          }
        );
      }, 3000);

    }, 3000);

  }

}
