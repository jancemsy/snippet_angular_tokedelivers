import { Component, Input, OnInit } from '@angular/core';
import { IProductItemCannabinoid, IProductTerpeneItem } from 'src/app/models';

@Component({
  selector: 'app-compounds',
  templateUrl: './compounds.component.html',
  styleUrls: ['./compounds.component.scss']
})
export class CompoundsComponent implements OnInit {

  @Input() terpenes: Array<IProductTerpeneItem>;
  @Input() cannabinoids: Array<IProductItemCannabinoid>;

  // public terpenes: any = [
  //   {name: 'Limonene', color: 'green' },
  //   {name: 'Isopulegol', color: 'purple' },
  //   {name: 'Neroliddol', color: 'yellow' }
  // ];

  // public cannabinoids: any = [
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  //   { name: 'THC', score: '19.2' },
  // ]

  constructor() { }

  ngOnInit(): void {
  }

}
