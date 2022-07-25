import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogCartDetailsComponent } from '../dialog-cart-details/dialog-cart-details.component';

@Component({
  selector: 'app-dialog-loyalty-points',
  templateUrl: './dialog-loyalty-points.component.html',
  styleUrls: ['./dialog-loyalty-points.component.scss']
})
export class DialogLoyaltyPointsComponent implements OnInit {

  public availablePoints: any[] = [
    { points: 1000, off: '$10' },
    { points: 500, off: '$5' },
    { points: 200, off: '$2' },
  ];

  constructor(public dialogRef: MatDialogRef<DialogCartDetailsComponent>,) { }

  ngOnInit() {
  }

}
