import { Component, Input, OnInit } from '@angular/core';
import { IProductItemEffect, IProductItemFlavour } from 'src/app/models';
import { Colors } from 'src/app/pages/web-store/product/components/shared/icon-colors.data';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  @Input() flavors: Array<IProductItemFlavour>;
  @Input() effects: Array<IProductItemEffect>;

  // public effects:any = [
  //   { name: 'Energetic', score: 10 },
  //   { name: 'Happy', score: 5 },
  //   { name: 'Creative', score: 2 },
  //   { name: 'Focused', score: 3 },
  //   { name: 'Inspired', score: 7 }
  // ];

  // public flavors:any = [
  //   { icon: '', name: 'LEMON', score: 1, color: '#d2691e' },
  //   { icon: '', name: 'MINT', score: 3, color: '#354c1a' },
  //   { icon: '', name: 'GINGER', score: 5, color: '#efefef' },
  // ]

  constructor() { }

  ngOnInit(): void {

  }

  getFlavorColor(icon) {
    return Colors[icon];
  }

}
