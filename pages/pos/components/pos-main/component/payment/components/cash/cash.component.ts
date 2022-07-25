import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosCartItem, PosCartSummary } from 'src/app/models';
import { PosMainService } from 'src/app/services/pos/pos-main/pos-main.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CashComponent implements OnInit {

  @Output() complete = new EventEmitter<any>();
  public amount : string;
  public amountLeft : string;
  public amountRight : string;
  public isInsufficient : boolean;
 
  public cartSummary : PosCartSummary;
  public cartItems : PosCartItem[];


  private _unsubscribe$ = new Subject<any>();

  constructor(
      private _posService : PosService,
      private _posMainService : PosMainService,
      private _posSideService : PosSideService,
      private _changeDetectorRef : ChangeDetectorRef
  ) { 

    this.amount = "";
    this.isInsufficient = true;
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
  }

  currencyView(){
    return parseFloat(this.amount)/100;
  }

  onNumberTap(number : string){
    if(this.amount.length < 10){
      if(!(this.amount.length < 1 && number == '0')){
        this.amount += number;
        this.checkInsufficient();
      }
    }
  }

  onDeleteTap(){
    this.amount = this.amount.slice(0, -1); 
    this.checkInsufficient();
  }

  onClearTap(){
    this.amount = '';
    this.checkInsufficient();
    
  }

  checkInsufficient(){
    if(parseFloat((this.amount ? this.amount : '0'))/100 < this.cartSummary.total){
      this.isInsufficient = true;
    }else{
      this.isInsufficient = false;
    }
  }

  onTakePayment(event) {
    if(!(parseFloat(this.amount)/100 < this.cartSummary.total)){
      if(this.amount.length > 0){
        let order_data = this._posService.prepareOrder(this.cartItems, this.cartSummary, {method : 'cash' , amount : parseFloat(this.amount)/100});

        this._posService.addOrder(order_data)
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this._posSideService.setPosOrderNumber(successResponse.data.order_number);
              this._posSideService.setPosChange(parseFloat(successResponse.data.change));
              this._posMainService.setPosDebitPaymentStatus('waiting');
              this._posService.setTransactionComplete(true);
              this.amount = '';
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[ORDER_FAIL] fail :', errorResponse)
          }
        );
        
      }
    }
  }

}
