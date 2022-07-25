import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit {
  @Input() selectedDispensary: any;
  constructor() { }

  ngOnInit(): void {
  }

}
