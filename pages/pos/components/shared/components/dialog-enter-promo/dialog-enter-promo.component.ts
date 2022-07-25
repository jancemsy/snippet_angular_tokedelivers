import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-dialog-enter-promo',
  templateUrl: './dialog-enter-promo.component.html',
  styleUrls: ['./dialog-enter-promo.component.scss']
})
export class DialogEnterPromoComponent implements OnInit {

  public promo: string;
  public isDisabled: boolean = true;
  public isVerifying: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogEnterPromoComponent>,
    private _posSideService: PosSideService,
    private _posService: PosService,
  ) { }

  ngOnInit() {

  }

  onChanging() {
    if (!this.promo || this.promo == '') {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }

  }

  onApply() {

    this.isVerifying = true;

    // TODO api verify promo code here

    this._posSideService.addPromoCode(this.promo);

    setTimeout(() => {
      this.dialogRef.close();
      this._posService.setPosAlert({
        activate: true,
        message: 'Promo code applied',
        icon: 'fa-check'
      });
    }, 1000);
  }

}
