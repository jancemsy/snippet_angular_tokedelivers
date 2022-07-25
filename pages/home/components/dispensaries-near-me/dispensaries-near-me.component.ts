import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OpenDispensariesService } from '../../../../services/dispensaries/open-dispensaries.service'

@Component({
  selector: 'app-dispensaries-near-me',
  templateUrl: './dispensaries-near-me.component.html',
  styleUrls: ['./dispensaries-near-me.component.scss'],
})
export class DispensariesNearMeComponent implements OnDestroy, OnInit {
  @Output() dispensarySelected = new EventEmitter<any>(null);
  @ViewChild('cardSlider') cardSlider: ElementRef;

  vm: any = { location: null };
  atTop = true;
  atBottom = false;

  private _dispensaries$ = new BehaviorSubject<any>(null);
  dispensaries$ = this._dispensaries$.asObservable();

  private _unsubscribe$ = new Subject<any>();

  constructor(
    private _openDispensary: OpenDispensariesService,
  ) { }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
  }

  getDispensaries(event: any) {
    const { location } = event || this.vm;

    this._openDispensary.getDispensariesNearby(location)
      .pipe( takeUntil(this._unsubscribe$) )
      .subscribe(
        (successResponse: any) => {
          const { data: { dispensaries } } = successResponse;
          this._dispensaries$.next(dispensaries);

          if (dispensaries && dispensaries.length) {
            this.dispensarySelected.emit(dispensaries[0]);
          }
        },
        (errorResponse: any) => {
          console.log(errorResponse);
        }
      );
  }

  scroll(direction: string) {
    const card = 388;
    const { nativeElement } = this.cardSlider;
    const { scrollLeft } = nativeElement;

    switch(direction) {
      case 'right':
        this.atTop = false;
        const prevScrollValue = scrollLeft;
        nativeElement.scrollLeft = scrollLeft + card;

        if (prevScrollValue && prevScrollValue === nativeElement.scrollLeft) {
          this.atBottom = true;
        } else {
          this.atBottom = false;
        }

        break;

      case 'left':
        this.atBottom = false;
        if (scrollLeft >= card) {
          this.atTop = false;
          nativeElement.scrollLeft = scrollLeft - card;
        } else {
          nativeElement.scrollLeft = 0;
          this.atTop = true;
        }
        break;
    }
  }

  selectDispensary(item) {
    this.dispensarySelected.emit(item);
  }
}
