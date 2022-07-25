import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispensary-item',
  templateUrl: './dispensary-item.component.html',
  styleUrls: ['./dispensary-item.component.scss']
})
export class DispensaryItemComponent implements OnInit {
  @Input() dispensary: any;

  constructor() { }

  ngOnInit(): void {
  }

}
