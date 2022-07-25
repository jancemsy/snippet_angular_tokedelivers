import { Component, Input ,OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SpecialDeal } from 'src/app/models';

@Component({
  selector: 'app-special-deals',
  templateUrl: './special-deals.component.html',
  styleUrls: ['./special-deals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SpecialDealsComponent implements OnInit {

  @Input() specialDeals :  SpecialDeal[];

  public customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin : 11,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      },
      1140: {
        items: 5
      },
      1340: {
        items: 5
      },
      1540: {
        items: 5
      },
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
      
  }

}
