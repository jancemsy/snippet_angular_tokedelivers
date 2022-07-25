import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PosSideService } from 'src/app/services/pos/pos-side/pos-side.service';

@Component({
  selector: 'app-custom-alert-dialog',
  templateUrl: './dialog-clear-cart.component.html',
  styleUrls: ['./dialog-clear-cart.component.scss']
})
export class DialogClearCartComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogClearCartComponent>,
    private _posSideService: PosSideService,
  ) { }

  ngOnInit(): void {
    // this.closeAfter5seconds();
  }

  clearCartItems() {
    this._posSideService.resetCartItems();
    this.dialogRef.close();
  }

}
