import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PosService } from 'src/app/services/pos/pos.service';

@Component({
  selector: 'app-dialog-customer-new',
  templateUrl: './dialog-customer-new.component.html',
  styleUrls: ['./dialog-customer-new.component.scss']
})
export class DialogCustomerNewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogCustomerNewComponent>,
    private _posServe: PosService
  ) { }

  ngOnInit() {
  }

  onScan() {
    this._posServe.setPosScanner({
      image: '',
      type: 'medical',
      status: 'scanning'
    });
  }

  onSave() {
    // TODO saving here
    this.dialogRef.close();
  }
}
