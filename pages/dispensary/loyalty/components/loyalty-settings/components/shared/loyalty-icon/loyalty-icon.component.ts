import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loyalty-icon',
  templateUrl: './loyalty-icon.component.html',
  styleUrls: ['./loyalty-icon.component.scss']
})
export class LoyaltyIconComponent implements OnInit {

  @Input() color: string = "transparent";
  @Input() type: number = 1;
  @Input() label: string = "";

  constructor() { }

  ngOnInit() {
  }

}
