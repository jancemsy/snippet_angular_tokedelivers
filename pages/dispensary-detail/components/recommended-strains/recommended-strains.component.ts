import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RecommendedStrain } from 'src/app/models/dispensary/dispensary.model';

@Component({
  selector: 'app-recommended-strains',
  templateUrl: './recommended-strains.component.html',
  styleUrls: ['./recommended-strains.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendedStrainsComponent implements OnInit, AfterViewChecked {

  @Input() recommendedStrains :  RecommendedStrain[];
  @ViewChild("strainCarousel") strainCarousel: ElementRef;

  public customOptions: OwlOptions = {
    loop: true,
    center:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin : 0,
    stagePadding: 0,
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
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      },
      1140 : {
        items: 3
      },
    },
    nav: true
  }
  constructor() { }

  // Fix for recommended strain budtender
  ngAfterViewChecked(): void {
    if (this.strainCarousel) {
      let elements = this.strainCarousel.nativeElement.querySelectorAll('.owl-item');

      for (var i = elements.length - 1; i >= 0; i--) {
        elements[i].style.zIndex = -1 * (i);
      }
    }
  }

  ngOnInit(): void {
  }

}
