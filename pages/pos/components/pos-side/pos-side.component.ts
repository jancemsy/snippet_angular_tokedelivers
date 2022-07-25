import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosCartItem, PosCartSummary } from 'src/app/models';
import { PosService } from 'src/app/services/pos/pos.service';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { listAnimation } from 'src/app/shared/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogClearCartComponent } from '../shared/components/dialog-clear-cart/dialog-clear-cart.component'
import { DialogEnterPromoComponent } from '../shared/components/dialog-enter-promo/dialog-enter-promo.component'
import { DialogCartDetailsComponent } from '../shared/components/dialog-cart-details/dialog-cart-details.component';

@Component({
  selector: 'app-pos-side',
  templateUrl: './pos-side.component.html',
  styleUrls: ['./pos-side.component.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PosSideComponent implements OnInit {
  private _unsubscribe$ = new Subject<any>();

  public cartItems : PosCartItem[];

  public cartSummary : PosCartSummary;

  public isTransactionComplete : boolean;

  public posMode : string;

  constructor(
    private _posService: PosService,
    private _posSideService: PosSideService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _dialog: MatDialog,
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
            console.log('[IS_TRANSACTION_COMPLETE] fail :', errorResponse)
          }
    );

    this._posSideService.cartItems
        .pipe( takeUntil(this._unsubscribe$) )
        .subscribe(
          (successResponse: any) => {
              this.cartItems = successResponse;
              this._posSideService.refreshCartSummary();
              this._changeDetectorRef.markForCheck();
          },
          (errorResponse: any) => {
            console.log('[CART_ITEMS] fail :', errorResponse)
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



  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onCheckout() {
    if(this.cartItems.length > 0){
      this._posService.setPosMode('checkout');
    }
  }

  addProductQuantity(index, cartItem){
    cartItem.quantity += 1;
    this._posSideService.updateCartItem(index, cartItem);
  }

  removeProductQuantity(index, cartItem){
    if(cartItem.quantity > 1){
      cartItem.quantity -= 1;
      this._posSideService.updateCartItem(index, cartItem);
    }else{
      this._posSideService.removeCartItem(index);
    }
  }

  onConfirmClearCart() {
    this._dialog.open(DialogClearCartComponent, {
      panelClass: ['pos-dialog-container', 'gray']
    });
  }

  onEnterPromoCode() {
    this._dialog.open(DialogEnterPromoComponent, {
      panelClass: ['pos-dialog-container', 'gray']
    });
  }

  onShowCartDetails() {
    this._dialog.open(DialogCartDetailsComponent, {
      panelClass: ['pos-dialog-container', 'light-peach', 'no-padding'],
      position: {
        top: '2vh'
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    let cartItem = this.cartItems[event.currentIndex];
    if(event.distance.x > 30){
      cartItem.status < 1 ? cartItem.status++ : cartItem.status;
    }else if(event.distance.x < -30){
      cartItem.status > -1 ? cartItem.status-- : cartItem.status;
    }
    this._posSideService.updateCartItem(event.currentIndex, cartItem);
  }


}
