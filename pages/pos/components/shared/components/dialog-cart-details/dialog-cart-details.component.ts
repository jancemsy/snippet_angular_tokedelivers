import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PosCartItem, PosCartSummary } from 'src/app/models';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';

@Component({
  selector: 'app-dialog-cart-details',
  templateUrl: './dialog-cart-details.component.html',
  styleUrls: ['./dialog-cart-details.component.scss']
})
export class DialogCartDetailsComponent implements OnInit {

  public cartSummary$: Observable<PosCartSummary>;
  public cartItem$: Observable<PosCartItem[]>;

  constructor(
    public dialogRef: MatDialogRef<DialogCartDetailsComponent>,
    private _posSideService: PosSideService
  ) {
    this.cartSummary$ = this._posSideService.cartSummary;
    this.cartItem$ = this._posSideService.cartItems;
  }

  ngOnInit() {

  }

}
