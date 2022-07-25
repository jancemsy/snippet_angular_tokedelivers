import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-redeem-rewards-dialog',
  templateUrl: './redeem-rewards-dialog.component.html',
  styleUrls: ['./redeem-rewards-dialog.component.scss']
})
export class RedeemRewardsDialogComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data;

  points: number = 0;

  constructor() { }

  ngOnInit(): void {
    // this.points = this.data.loyalties;
    console.log(this.data);
  }

}
